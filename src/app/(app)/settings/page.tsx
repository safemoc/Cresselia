import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "用户设置 · Cresselia",
};

export default function SettingsPage() {
  return (
    <main className="relative z-10 mx-auto flex min-h-[calc(100svh-2rem)] max-w-lg flex-col items-center justify-center px-6 py-20">
      <div className="glass w-full rounded-[28px] border border-white/10 px-8 py-14 text-center">
        <p className="font-display text-[10px] tracking-[0.45em] text-[color:var(--moon-rose)]">
          SETTINGS · 未启
        </p>
        <h1 className="mt-4 font-serif-cn text-2xl font-semibold text-white sm:text-3xl">
          此梦尚未成形
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-soft)]">
          用户设置页面将随后续版本开放。在此之前，先回到梦乡继续许愿吧。
        </p>
        <Link
          href="/home"
          className="btn-moon mt-10 inline-flex !px-8"
        >
          返回梦乡
        </Link>
      </div>
    </main>
  );
}
