import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api";
import { serverHttp } from "@/lib/api/server";
import { clearSessionCookies } from "@/lib/api/auth-cookies";

import { toErrorResponse } from "../../_lib/respond";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * POST /api/auth/logout
 *
 * 先通知 axum 注销当前 session（若上游支持），再清掉本地 cookie。
 * 即使 axum 报错（比如 401），也照样清 cookie，保证浏览器端一致性。
 */
export async function POST() {
  try {
    try {
      await serverHttp.post<void>("/auth/logout");
    } catch (err) {
      if (!(err instanceof ApiError) || err.status >= 500) {
        throw err;
      }
      // 4xx 视为已经失效，直接走到清 cookie 的分支。
    }
    await clearSessionCookies();
    return NextResponse.json({ ok: true });
  } catch (err) {
    await clearSessionCookies();
    return toErrorResponse(err);
  }
}
