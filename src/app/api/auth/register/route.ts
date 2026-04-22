import { NextResponse } from "next/server";

import { serverHttp } from "@/lib/api/server";
import {
  extractTokens,
  stripTokens,
  writeSessionCookies,
} from "@/lib/api/auth-cookies";
import type { RegisterInput } from "@/lib/api";

import { readJson, toErrorResponse } from "../../_lib/respond";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * POST /api/auth/register
 *
 * 代理到 axum `/auth/register`。
 * 若 axum 注册后直接返回 token（自动登录），同时写入 cookie；
 * 否则仅返回用户资料，由前端自行跳转到 /login。
 */
export async function POST(request: Request) {
  try {
    const body = await readJson<RegisterInput>(request);

    const upstream = await serverHttp.post<
      Record<string, unknown>,
      RegisterInput
    >("/auth/register", body, { skipAuth: true });

    const tokens = extractTokens(upstream);
    if (tokens.accessToken) {
      await writeSessionCookies(tokens, false);
    }

    return NextResponse.json(stripTokens(upstream));
  } catch (err) {
    return toErrorResponse(err);
  }
}
