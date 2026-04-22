"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export interface AuthCardProps {
  /** 英文小标题（font-display，展示在中文主标题之上）。 */
  eyebrow: string;
  /** 中文主标题，例如「归来」「织下梦境」。 */
  title: string;
  /** 副标题/说明文字。 */
  description?: ReactNode;
  /** 左侧装饰（大月 / 诗意文案），仅 lg 以上出现。 */
  aside?: ReactNode;
  /** 表单内容。 */
  children: ReactNode;
  /** 卡片底部的次要链接（如"已有账户？登录"）。 */
  footer?: ReactNode;
}

/**
 * 登录 / 注册共用的玻璃卡片外壳。
 * 双列布局：左侧 `aside`（月亮与诗意文案），右侧内容。
 */
export function AuthCard({
  eyebrow,
  title,
  description,
  aside,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="relative grid w-full max-w-5xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
      {aside ? (
        <div className="hidden lg:block relative">{aside}</div>
      ) : null}

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 rounded-[48px] opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(255,142,199,0.18), transparent 60%), radial-gradient(circle at 80% 90%, rgba(122,216,255,0.16), transparent 60%)",
          }}
        />
        <div className="relative glass rounded-[28px] px-8 py-12 sm:px-12 sm:py-14">
          <div className="auth-eyebrow">{eyebrow}</div>
          <h1 className="mt-6 font-serif-cn text-4xl sm:text-5xl font-semibold leading-tight text-gradient-moon">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-[color:var(--ink-soft)] leading-relaxed">
              {description}
            </p>
          ) : null}

          <div className="mt-10">{children}</div>

          {footer ? (
            <div className="mt-8 border-t border-white/5 pt-6 text-sm text-[color:var(--ink-muted)]">
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/**
 * 通用的月亮装饰（用于 AuthCard 左侧插槽）。
 * 复用全站 `.moon` / `.moon-halo` / `.moon-orbit` 样式。
 */
export function AuthAside({
  poem,
  caption,
}: {
  poem: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div
        className="relative mx-auto float-soft"
        style={{
          width: "min(32vw, 360px)",
          aspectRatio: "1 / 1",
        }}
      >
        <div className="moon-halo" />
        <div className="moon" />
        <div className="moon-orbit" />
      </div>

      <div className="mt-16 font-serif-cn text-2xl leading-relaxed tracking-[0.15em] text-white/90">
        {poem}
      </div>
      {caption ? (
        <div className="mt-4 font-display text-[11px] tracking-[0.5em] text-[color:var(--ink-muted)]">
          {caption}
        </div>
      ) : null}
    </div>
  );
}

export function AuthFooterLink({
  prompt,
  href,
  label,
}: {
  prompt: string;
  href: string;
  label: string;
}) {
  return (
    <p className="text-center sm:text-left">
      <span>{prompt}</span>
      <Link
        href={href}
        className="ml-2 inline-flex items-center gap-1 font-serif-cn text-white hover:text-[color:var(--moon-rose)] transition-colors"
      >
        {label}
        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M5 12h14M13 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </p>
  );
}
