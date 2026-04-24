import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_COOKIE } from "@/lib/api/server";

export const metadata: Metadata = {
  title: "梦乡 · Cresselia",
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jar = await cookies();
  if (!jar.get(SESSION_COOKIE)) {
    redirect("/login?from=/home");
  }

  return (
    <div className="relative min-h-[100svh] w-full overflow-x-hidden">
      <div className="cosmic-bg" />
      {children}
    </div>
  );
}
