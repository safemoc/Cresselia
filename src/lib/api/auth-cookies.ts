/**
 * BFF 侧的会话 cookie 助手。
 *
 * 约定：
 *   - axum 的 `/auth/login` 与 `/auth/register` 返回形如：
 *       { token: string, refreshToken?: string, expiresIn?: number, user: {...} }
 *     其中 token 字段名兼容 `token` / `accessToken` / `access_token`。
 *   - BFF 拿到后把 token 写入 httpOnly cookie，浏览器永远拿不到明文 token。
 *
 * 拿到真实接口定义后，大概率只需要改 {@link extractTokens} 的字段名。
 */

import "server-only";
import { cookies } from "next/headers";

import { REFRESH_COOKIE, SESSION_COOKIE } from "./server";

const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const REMEMBER_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export interface ExtractedTokens {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
}

export function extractTokens(payload: unknown): ExtractedTokens {
  if (!payload || typeof payload !== "object") {
    return { accessToken: null, refreshToken: null, expiresIn: null };
  }
  const p = payload as Record<string, unknown>;

  const accessToken =
    pickString(p, ["token", "accessToken", "access_token"]) ?? null;
  const refreshToken =
    pickString(p, ["refreshToken", "refresh_token"]) ?? null;
  const expiresInRaw =
    p.expiresIn ?? p.expires_in ?? p.expires ?? null;
  const expiresIn =
    typeof expiresInRaw === "number" && Number.isFinite(expiresInRaw)
      ? expiresInRaw
      : null;

  return { accessToken, refreshToken, expiresIn };
}

function pickString(
  obj: Record<string, unknown>,
  keys: string[]
): string | null {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return null;
}

/**
 * 从 axum 响应 payload 中剔除 token 相关字段，返回可以安全交给浏览器的部分。
 */
export function stripTokens<T extends Record<string, unknown>>(
  payload: T
): Omit<T, "token" | "accessToken" | "access_token" | "refreshToken" | "refresh_token" | "expiresIn" | "expires_in"> {
  const {
    token: _1,
    accessToken: _2,
    access_token: _3,
    refreshToken: _4,
    refresh_token: _5,
    expiresIn: _6,
    expires_in: _7,
    ...rest
  } = payload;
  void _1; void _2; void _3; void _4; void _5; void _6; void _7;
  return rest as Omit<
    T,
    | "token"
    | "accessToken"
    | "access_token"
    | "refreshToken"
    | "refresh_token"
    | "expiresIn"
    | "expires_in"
  >;
}

export async function writeSessionCookies(
  tokens: ExtractedTokens,
  remember: boolean
): Promise<void> {
  const jar = await cookies();
  const isProd = process.env.NODE_ENV === "production";

  const sessionMaxAge = tokens.expiresIn
    ? Math.max(60, Math.min(tokens.expiresIn, REMEMBER_MAX_AGE))
    : remember
      ? REMEMBER_MAX_AGE
      : DEFAULT_MAX_AGE;

  if (tokens.accessToken) {
    jar.set(SESSION_COOKIE, tokens.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: sessionMaxAge,
    });
  }

  if (tokens.refreshToken) {
    jar.set(REFRESH_COOKIE, tokens.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: REMEMBER_MAX_AGE,
    });
  }
}

export async function clearSessionCookies(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  jar.delete(REFRESH_COOKIE);
}
