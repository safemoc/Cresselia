import { NextResponse } from "next/server";

import type { SendRegisterCodeInput } from "@/lib/api";
import { serverHttp } from "@/lib/api/server";

import { readJson, toErrorResponse } from "../../../_lib/respond";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * POST /api/auth/register/send-code
 *
 * 代理到 axum `/client/user/register/send-code`。
 */
export async function POST(request: Request) {
  try {
    const body = await readJson<SendRegisterCodeInput>(request);

    const upstream = await serverHttp.post<
      Record<string, unknown>,
      SendRegisterCodeInput
    >("/client/user/register/send-code", body, { skipAuth: true });

    return NextResponse.json(upstream);
  } catch (err) {
    return toErrorResponse(err);
  }
}
