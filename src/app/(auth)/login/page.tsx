import type { Metadata } from "next";

import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "归来 · Cresselia",
  description: "登录 Cresselia，继续未完的梦境。",
};

/**
 * Next.js 16: page 的 `searchParams` 是一个 Promise，必须 await。
 * 这里把 `from` 透传给客户端表单，表单登录成功后再跳回这个页面。
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const rawFrom = Array.isArray(sp.from) ? sp.from[0] : sp.from;
  const from = sanitizeFrom(rawFrom);

  return <LoginForm redirectTo={from ?? "/"} />;
}

/** 只允许相对路径，防止开放重定向。 */
function sanitizeFrom(value: string | undefined): string | null {
  if (!value) return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  return value;
}
