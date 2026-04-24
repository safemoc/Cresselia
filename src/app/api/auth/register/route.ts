import { NextResponse } from "next/server";

import { serverHttp } from "@/lib/api/server";
import {
  extractTokens,
  writeSessionCookies,
} from "@/lib/api/auth-cookies";
import type { RegisterInput } from "@/lib/api";

import { readJson, toErrorResponse } from "../../_lib/respond";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * POST /api/auth/register
 *
 * 代理到 axum `/client/user/register`。
 * 注册成功后会尝试自动调用登录接口，把 access token 写入 cookie。
 */
export async function POST(request: Request) {
  try {
    const body = await readJson<RegisterInput>(request);

    const upstream = await serverHttp.post<
      Record<string, unknown>,
      { email: string; code: string; password: string }
    >(
      "/client/user/register",
      {
        email: body.email,
        code: body.code,
        password: body.password,
      },
      { skipAuth: true }
    );

    try {
      const loginPayload = await serverHttp.post<
        Record<string, unknown>,
        { account: string; password: string }
      >(
        "/client/user/login",
        { account: body.email, password: body.password },
        { skipAuth: true }
      );

      const tokens = extractTokens(loginPayload);
      if (tokens.accessToken) {
        await writeSessionCookies(tokens, false);
      }
    } catch {
      // 注册已成功，自动登录失败时仅返回注册结果，让前端后续自行处理。
    }

    return NextResponse.json(upstream);
  } catch (err) {
    return toErrorResponse(err);
  }
}
