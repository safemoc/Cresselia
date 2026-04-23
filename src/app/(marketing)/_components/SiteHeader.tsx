"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "#manifesto", label: "神谕" },
  { href: "#capabilities", label: "神迹" },
  { href: "#ritual", label: "仪轨" },
  { href: "#legends", label: "传世" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-xl bg-[rgba(10,8,32,0.55)] border-b border-white/5"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#top" className="flex items-center gap-3 group">
          <CrescentMark className="h-8 w-8 text-[color:var(--moon-rose)] transition-transform duration-500 group-hover:rotate-12" />
          <div className="leading-none">
            <div className="font-display text-lg tracking-[0.35em] text-white">
              CRESSELIA
            </div>
            <div className="font-serif-cn text-[10px] tracking-[0.5em] text-[color:var(--ink-muted)] mt-1">
              新 月 织 梦
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm tracking-[0.3em] font-serif-cn text-[color:var(--ink-soft)] hover:text-white transition-colors group"
            >
              {item.label}
              <span className="absolute left-0 -bottom-2 h-px w-0 bg-gradient-to-r from-[color:var(--moon-rose)] to-[color:var(--moon-cyan)] transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <Link
          href="/login"
          className="btn-moon btn-moon--sm inline-flex"
          aria-label="登录 Cresselia"
        >
          <span>归 梦</span>
          <Arrow />
        </Link>
      </div>
    </header>
  );
}

function CrescentMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <radialGradient id="cres-grad" cx="40%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="60%" stopColor="currentColor" />
          <stop offset="100%" stopColor="#b78fff" />
        </radialGradient>
      </defs>
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
        fill="url(#cres-grad)"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
