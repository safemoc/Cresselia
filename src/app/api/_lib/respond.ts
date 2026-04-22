import "server-only";
import { NextResponse } from "next/server";

import { ApiError, NetworkError } from "@/lib/api";

/**
 * 将 BFF 内抛出的错误统一翻译为对浏览器友好的 JSON 响应。
 * 约定响应形状：`{ code: string, message: string, details?: unknown }`
 */
export function toErrorResponse(err: unknown): NextResponse {
  if (err instanceof ApiError) {
    return NextResponse.json(
      { code: err.code, message: err.message, details: err.details },
      { status: err.status }
    );
  }
  if (err instanceof NetworkError) {
    return NextResponse.json(
      { code: "UPSTREAM_UNREACHABLE", message: err.message },
      { status: 502 }
    );
  }
  if (err instanceof SyntaxError) {
    return NextResponse.json(
      { code: "BAD_JSON", message: "请求体不是合法 JSON。" },
      { status: 400 }
    );
  }
  console.error("[BFF] unexpected error", err);
  return NextResponse.json(
    { code: "INTERNAL", message: "服务端开了个小差。" },
    { status: 500 }
  );
}

/** 读取并轻度校验请求 JSON body。 */
export async function readJson<T>(req: Request): Promise<T> {
  const text = await req.text();
  if (!text) return {} as T;
  return JSON.parse(text) as T;
}
