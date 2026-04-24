"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import type { UserProfile } from "@/lib/api";
import { api } from "@/lib/api";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CrescentFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <radialGradient id="dock-crescent" cx="40%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="60%" stopColor="currentColor" />
          <stop offset="100%" stopColor="#b78fff" />
        </radialGradient>
      </defs>
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
        fill="url(#dock-crescent)"
      />
    </svg>
  );
}

export function AvatarDock({ user }: { user: UserProfile | null }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const initial =
    user?.nickname?.charAt(0) ??
    user?.email?.charAt(0)?.toUpperCase() ??
    "?";

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } catch {
      /* still navigate */
    }
    router.push("/");
    router.refresh();
  }, [router]);

  const avatarUrl = user?.avatarUrl;

  return (
    <div
      ref={rootRef}
      className="dream-avatar-dock fixed bottom-6 left-4 z-40 md:left-6"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="dream-avatar-btn relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[rgba(10,8,32,0.75)] shadow-lg backdrop-blur-md transition hover:border-[color:var(--moon-rose)]/40"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="打开导航菜单"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={user?.nickname ? `${user.nickname} 的头像` : "用户头像"}
            width={56}
            height={56}
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center text-[color:var(--moon-rose)]">
            <CrescentFallback className="absolute h-10 w-10 opacity-90" />
            <span className="relative z-[1] font-serif-cn text-sm font-semibold text-white drop-shadow">
              {initial}
            </span>
          </div>
        )}
      </button>

      {open ? (
        <div
          role="menu"
          className="dream-avatar-menu absolute bottom-full left-0 mb-3 min-w-[200px] rounded-2xl border border-white/10 bg-[rgba(10,8,32,0.92)] py-2 shadow-xl backdrop-blur-md"
        >
          <MenuButton onClick={() => { scrollToId("history"); setOpen(false); }}>
            生成历史
          </MenuButton>
          <MenuButton onClick={() => { scrollToId("legacy"); setOpen(false); }}>
            我的收藏
          </MenuButton>
          <MenuButton onClick={() => { scrollToId("top"); setOpen(false); }}>
            回到顶部
          </MenuButton>
          <div className="my-2 h-px bg-white/10" role="separator" />
          <MenuLink href="/settings" onNavigate={() => setOpen(false)}>
            用户设置
          </MenuLink>
          <MenuButton
            onClick={() => {
              setOpen(false);
              void logout();
            }}
            className="text-[color:var(--ink-muted)] hover:text-[#ffb8c2]"
          >
            退出登录
          </MenuButton>
        </div>
      ) : null}
    </div>
  );
}

function MenuButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={`dream-menu-item block w-full px-4 py-2.5 text-left font-serif-cn text-sm tracking-[0.12em] text-[color:var(--ink-soft)] transition hover:bg-white/[0.06] hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}

function MenuLink({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onNavigate}
      className="dream-menu-item block w-full px-4 py-2.5 font-serif-cn text-sm tracking-[0.12em] text-[color:var(--ink-soft)] transition hover:bg-white/[0.06] hover:text-white"
    >
      {children}
    </Link>
  );
}
