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
 * 代理到 axum `/auth/login`。
 * 成功后把 token 写入 httpOnly cookie，浏览器只能看到 `{ user }`。
 */
export async function POST(request: Request) {
  try {
    const body = await readJson<LoginInput>(request);

    const upstream = await serverHttp.post<Record<string, unknown>, LoginInput>(
      "/auth/login",
      body,
      { skipAuth: true }
    );

    const tokens = extractTokens(upstream);
    await writeSessionCookies(tokens, Boolean(body.remember));

    return NextResponse.json(stripTokens(upstream));
  } catch (err) {
    return toErrorResponse(err);
  }
}
