"use client";

import { useEffect, useState } from "react";

import { SpotlightCard } from "@/app/(marketing)/_components/SpotlightCard";

export function HistorySection() {
  const [arrivals, setArrivals] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const onArrived = () => {
      setArrivals((count) => count + 1);
      setFlash(true);
      window.setTimeout(() => setFlash(false), 650);
    };

    window.addEventListener("dream:arrived", onArrived);
    return () => window.removeEventListener("dream:arrived", onArrived);
  }, []);

  return (
    <section
      id="history"
      className="anchor-offset relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent via-[color:var(--bg-deep)] to-[color:var(--bg-deep)] px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <h2
            className={[
              "font-serif-cn text-3xl font-semibold sm:text-4xl text-gradient-moon",
              flash ? "dream-arrived-flash" : "",
            ].join(" ")}
          >
            生成历史
          </h2>
          {arrivals > 0 ? (
            <span className="rounded-full border border-[color:var(--moon-rose)]/20 bg-white/[0.05] px-3 py-1 text-xs tracking-[0.18em] text-[color:var(--ink-soft)]">
              收到 {arrivals} 颗新星
            </span>
          ) : null}
        </div>
        <p className="mt-3 font-serif-cn text-sm tracking-[0.2em] text-[color:var(--ink-muted)]">
          你的梦境会在此一一显影
        </p>
        <div className="mt-12">
          <SpotlightCard>
            <p className="text-center font-serif-cn text-[color:var(--ink-soft)] leading-relaxed">
              梦境尚未降临。
              <br />
              在上方许下愿望后，成片将在此排列成星河。
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
