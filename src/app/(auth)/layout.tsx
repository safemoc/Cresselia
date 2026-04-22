import type { Metadata } from "next";
import Link from "next/link";

import { StarField } from "../(marketing)/_components/StarField";

export const metadata: Metadata = {
  title: "梦境入口 · Cresselia",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="cosmic-bg" />
      <StarField density={0.00012} />

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 sm:px-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="回到 Cresselia 首页"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 text-[color:var(--moon-rose)] transition-transform duration-500 group-hover:rotate-12"
            aria-hidden
          >
            <defs>
              <radialGradient id="auth-crescent" cx="40%" cy="40%" r="70%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="60%" stopColor="currentColor" />
                <stop offset="100%" stopColor="#b78fff" />
              </radialGradient>
            </defs>
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
              fill="url(#auth-crescent)"
            />
          </svg>
          <div className="leading-none">
            <div className="font-display text-base tracking-[0.35em] text-white">
              CRESSELIA
            </div>
            <div className="font-serif-cn text-[10px] tracking-[0.5em] text-[color:var(--ink-muted)] mt-1">
              新 月 织 梦
            </div>
          </div>
        </Link>

        <Link
          href="/"
          className="font-serif-cn text-xs tracking-[0.3em] text-[color:var(--ink-muted)] hover:text-white transition-colors"
        >
          返回月外 ↗
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100svh-80px)] w-full max-w-6xl items-center justify-center px-6 py-14 sm:px-10">
        {children}
      </main>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-[color:var(--bg-deep)]"
      />
    </div>
  );
}
