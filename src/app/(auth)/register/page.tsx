import type { Metadata } from "next";

import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "织梦 · Cresselia",
  description: "在 Cresselia 为你的品牌点亮第一枚新月。",
};

/**
 * /register 支持从营销页底部表单带来 `?email=xxx` 作为预填邮箱。
 */
export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const rawEmail = Array.isArray(sp.email) ? sp.email[0] : sp.email;
  const email = sanitizeEmail(rawEmail);

  return <RegisterForm initialEmail={email ?? ""} />;
}

function sanitizeEmail(value: string | undefined): string | null {
  if (!value) return null;
  if (value.length > 254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return null;
  return value;
}
