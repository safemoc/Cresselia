"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  const moonRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const moon = moonRef.current;
    const title = titleRef.current;
    if (!stage || !moon || !title) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let rx = 0;
    let ry = 0;
    let tx = 0;
    let ty = 0;
    let scrollY = 0;
    let raf = 0;

    const onMouse = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      tx = (e.clientX - cx) / rect.width;
      ty = (e.clientY - cy) / rect.height;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const tick = () => {
      rx += (tx - rx) * 0.08;
      ry += (ty - ry) * 0.08;
      const sDown = Math.min(scrollY, 600);
      const parallax = sDown * 0.3;
      const fade = Math.max(0, 1 - sDown / 520);
      moon.style.transform = `translate3d(${rx * 30}px, ${
        ry * 20 - parallax * 0.6
      }px, 0) rotate(${rx * 4}deg)`;
      moon.style.opacity = String(0.4 + fade * 0.6);
      title.style.transform = `translate3d(${rx * -14}px, ${
        ry * -8 - parallax * 0.25
      }px, 0)`;
      title.style.opacity = String(fade);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="top"
      ref={stageRef}
      className="relative min-h-[100svh] w-full overflow-hidden pt-28 pb-16 flex items-center justify-center"
    >
      <div className="absolute inset-0 grid-noise opacity-40 pointer-events-none" />

      {/* Moon stage */}
      <div
        ref={moonRef}
        className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 float-soft"
        style={{ width: "min(58vw, 620px)", aspectRatio: "1 / 1" }}
      >
        <div className="moon-halo" />
        <div className="moon" />
        <div className="moon-orbit" />
        <div className="moon-orbit outer" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
        <div className="flex justify-center">
          <span className="divider-rune font-display text-[color:var(--moon-rose)]">
            <span>CRESCENT MUSE</span>
          </span>
        </div>

        <h1
          ref={titleRef}
          className="mt-8 font-display text-[clamp(3.6rem,12vw,9rem)] font-semibold leading-[0.95] text-gradient-moon drop-shadow-[0_10px_60px_rgba(255,142,199,0.35)]"
        >
          CRESSELIA
        </h1>

        <p className="mt-6 font-serif-cn text-2xl sm:text-3xl tracking-[0.35em] text-white/90">
          新 月 织 梦
        </p>

        <p className="mx-auto mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-[color:var(--ink-soft)]">
          取自那位在月相间穿行、驱散噩梦、降下好梦的传说宝可梦。
          <br className="hidden sm:block" />
          我们用生成式 AI 继承她的神性，将混沌的创意，织成能治愈人心的营销视频。
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/register" className="btn-moon">
            召唤新月
            <SparkleIcon />
          </a>
          <a href="#legends" className="btn-ghost">
            观摩梦境
            <PlayIcon />
          </a>
        </div>

        <div className="mt-20 flex justify-center">
          <span className="scroll-cue font-display">
            SCROLL · 向下坠入梦境
          </span>
        </div>
      </div>

      {/* Bottom edge fade to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[color:var(--bg-deep)]" />
    </section>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2zM19 15l.9 2.7L22 18l-2.1.3L19 21l-.9-2.7L16 18l2.1-.3L19 15z"
        fill="currentColor"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M8 5v14l11-7L8 5z"
        fill="currentColor"
      />
    </svg>
  );
}
