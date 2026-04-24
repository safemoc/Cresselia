import { NextResponse } from "next/server";

import { serverHttp } from "@/lib/api/server";
import {
  extractTokens,
  stripTokens,
  writeSessionCookies,
} from "@/lib/api/auth-cookies";
import type { LoginInput } from "@/lib/api";

import { readJson, toErrorResponse } from "../../_lib/respond";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * POST /api/auth/login
 *
 * 代理到 axum `/client/user/login`。
 * 前端仍然提交 email；BFF 在这里映射到后端需要的 `account` 字段。
 */
export async function POST(request: Request) {
  try {
    const body = await readJson<LoginInput>(request);

    const upstream = await serverHttp.post<
      Record<string, unknown>,
      { account: string; password: string }
    >(
      "/client/user/login",
      { account: body.email, password: body.password },
      { skipAuth: true }
    );

    const tokens = extractTokens(upstream);
    await writeSessionCookies(tokens, Boolean(body.remember));

    return NextResponse.json(stripTokens(upstream));
  } catch (err) {
    return toErrorResponse(err);
  }
}
