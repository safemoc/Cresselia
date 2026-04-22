/**
 * 浏览器侧的 typed fetch 封装。
 *
 * 约定：
 * - 所有请求都走同源 `/api/*`，由 Next.js BFF 代理到 Rust axum
 * - 带 `credentials: "include"` 以便携带 httpOnly cookie
 * - JSON in / JSON out，非 2xx 统一抛 {@link ApiError}
 * - 网络层失败抛 {@link NetworkError}
 */

import { ApiError, NetworkError, type ApiErrorPayload } from "./errors";

export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;

export interface RequestOptions {
  /** URL query 参数；数组会展开成多个同名 key。 */
  query?: Record<string, QueryValue>;
  /** 额外 header。`Content-Type` 会在有 body 时自动补齐。 */
  headers?: HeadersInit;
  /** AbortSignal，用于取消请求。 */
  signal?: AbortSignal;
  /** Next.js fetch 拓展（服务端调用时生效）。 */
  next?: { revalidate?: number | false; tags?: string[] };
  /** cache 模式。 */
  cache?: RequestCache;
}

type Json =
  | string
  | number
  | boolean
  | null
  | { [k: string]: Json }
  | Json[];

function buildUrl(url: string, query?: Record<string, QueryValue>): string {
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (const v of value) params.append(key, String(v));
    } else {
      params.append(key, String(value));
    }
  }
  const qs = params.toString();
  if (!qs) return url;
  return url + (url.includes("?") ? "&" : "?") + qs;
}

async function parseBody(res: Response): Promise<unknown> {
  if (res.status === 204 || res.status === 205) return undefined;
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    const text = await res.text();
    if (!text) return undefined;
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }
  return res.text();
}

async function request<T>(
  method: string,
  url: string,
  body?: unknown,
  options: RequestOptions = {}
): Promise<T> {
  const finalUrl = buildUrl(url, options.query);

  const headers = new Headers(options.headers);
  let payload: BodyInit | undefined;
  if (body !== undefined && body !== null) {
    if (typeof body === "string" || body instanceof FormData) {
      payload = body;
    } else {
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      payload = JSON.stringify(body);
    }
  }
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  let res: Response;
  try {
    res = await fetch(finalUrl, {
      method,
      headers,
      body: payload,
      credentials: "include",
      signal: options.signal,
      cache: options.cache,
      next: options.next,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new NetworkError(undefined, err);
  }

  const bodyParsed = await parseBody(res);

  if (!res.ok) {
    const payload = (isObject(bodyParsed) ? bodyParsed : {}) as ApiErrorPayload;
    throw ApiError.fromPayload(res.status, payload);
  }

  return bodyParsed as T;
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export const http = {
  get<T = Json>(url: string, options?: RequestOptions): Promise<T> {
    return request<T>("GET", url, undefined, options);
  },
  post<T = Json, B = unknown>(
    url: string,
    body?: B,
    options?: RequestOptions
  ): Promise<T> {
    return request<T>("POST", url, body, options);
  },
  put<T = Json, B = unknown>(
    url: string,
    body?: B,
    options?: RequestOptions
  ): Promise<T> {
    return request<T>("PUT", url, body, options);
  },
  patch<T = Json, B = unknown>(
    url: string,
    body?: B,
    options?: RequestOptions
  ): Promise<T> {
    return request<T>("PATCH", url, body, options);
  },
  del<T = Json>(url: string, options?: RequestOptions): Promise<T> {
    return request<T>("DELETE", url, undefined, options);
  },
};

export type Http = typeof http;
