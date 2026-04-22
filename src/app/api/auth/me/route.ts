import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { serverHttp, SESSION_COOKIE } from "@/lib/api/server";
import type { UserProfile } from "@/lib/api";

import { toErrorResponse } from "../../_lib/respond";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/auth/me
 *
 * 读当前会话 cookie，转发到 axum `/auth/me`（或 `/me`）拿用户资料。
 * 未登录时直接 401，避免打扰上游。
 */
export async function GET() {
  try {
    const jar = await cookies();
    if (!jar.get(SESSION_COOKIE)) {
      return NextResponse.json(
        { code: "UNAUTHENTICATED", message: "尚未登录。" },
        { status: 401 }
      );
    }

    const user = await serverHttp.get<UserProfile>("/auth/me");
    return NextResponse.json(user);
  } catch (err) {
    return toErrorResponse(err);
  }
}
