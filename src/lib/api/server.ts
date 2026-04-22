/**
 * 服务端 HTTP 客户端。
 *
 * 仅在 Route Handler / Server Action / Server Component 中使用。
 * 它会：
 *   1. 读取 `process.env.AXUM_API_URL` 作为 base URL
 *   2. 自动把 Next.js cookie 里的会话令牌转换为 `Authorization: Bearer <token>` 发给 axum
 *   3. 非 2xx 抛 {@link ApiError}，网络故障抛 {@link NetworkError}
 *
 * 为什么不直接用浏览器侧的 {@link http}：
 *   - 服务端没有同源概念，必须拼绝对 URL
 *   - 服务端不能用 `credentials: "include"`，要手动把 cookie 里的 token 翻译成 Authorization
 */

import "server-only";
import { cookies } from "next/headers";

import { ApiError, NetworkError, type ApiErrorPayload } from "./errors";

export const SESSION_COOKIE = "cres_session";
export const REFRESH_COOKIE = "cres_refresh";

export interface ServerRequestOptions {
  query?: Record<string, string | number | boolean | null | undefined>;
  headers?: HeadersInit;
  signal?: AbortSignal;
  /** 禁用自动注入 Authorization（例如登录/注册时本来就没有 token）。 */
  skipAuth?: boolean;
  /** 显式指定 bearer token，覆盖 cookie。 */
  bearer?: string | null;
  /** Next.js fetch 扩展。 */
  next?: { revalidate?: number | false; tags?: string[] };
  cache?: RequestCache;
}

function getBaseUrl(): string {
  const url = process.env.AXUM_API_URL;
  if (!url) {
    throw new Error(
      "AXUM_API_URL 未配置。请在 .env.local 中设置，例如 AXUM_API_URL=http://localhost:3001"
    );
  }
  return url.replace(/\/+$/, "");
}

function buildUrl(
  path: string,
  query?: ServerRequestOptions["query"]
): string {
  const base = getBaseUrl();
  const prefix = path.startsWith("/") ? "" : "/";
  let url = `${base}${prefix}${path}`;
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null) continue;
    params.append(k, String(v));
  }
  const qs = params.toString();
  if (qs) url += (url.includes("?") ? "&" : "?") + qs;
  return url;
}

async function resolveBearer(
  options: ServerRequestOptions
): Promise<string | null> {
  if (options.skipAuth) return null;
  if (options.bearer !== undefined) return options.bearer;
  try {
    const jar = await cookies();
    return jar.get(SESSION_COOKIE)?.value ?? null;
  } catch {
    return null;
  }
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

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

async function serverRequest<T>(
  method: string,
  path: string,
  body?: unknown,
  options: ServerRequestOptions = {}
): Promise<T> {
  const url = buildUrl(path, options.query);
  const headers = new Headers(options.headers);

  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  let payload: BodyInit | undefined;
  if (body !== undefined && body !== null) {
    if (typeof body === "string" || body instanceof FormData) {
      payload = body;
    } else {
      if (!headers.has("Content-Type"))
        headers.set("Content-Type", "application/json");
      payload = JSON.stringify(body);
    }
  }

  const bearer = await resolveBearer(options);
  if (bearer && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${bearer}`);
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: payload,
      signal: options.signal,
      cache: options.cache ?? "no-store",
      next: options.next,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new NetworkError("无法连接到后端服务。", err);
  }

  const parsed = await parseBody(res);

  if (!res.ok) {
    const payload = (isObject(parsed) ? parsed : {}) as ApiErrorPayload;
    throw ApiError.fromPayload(res.status, payload);
  }

  return parsed as T;
}

export const serverHttp = {
  get<T>(path: string, options?: ServerRequestOptions): Promise<T> {
    return serverRequest<T>("GET", path, undefined, options);
  },
  post<T, B = unknown>(
    path: string,
    body?: B,
    options?: ServerRequestOptions
  ): Promise<T> {
    return serverRequest<T>("POST", path, body, options);
  },
  put<T, B = unknown>(
    path: string,
    body?: B,
    options?: ServerRequestOptions
  ): Promise<T> {
    return serverRequest<T>("PUT", path, body, options);
  },
  patch<T, B = unknown>(
    path: string,
    body?: B,
    options?: ServerRequestOptions
  ): Promise<T> {
    return serverRequest<T>("PATCH", path, body, options);
  },
  del<T>(path: string, options?: ServerRequestOptions): Promise<T> {
    return serverRequest<T>("DELETE", path, undefined, options);
  },
};

export type ServerHttp = typeof serverHttp;
