"use client";

import { useEffect, useRef } from "react";

type Star = {
  angle: number;
  r: number;
  z: number;
  tw: number;
  twSpeed: number;
  hue: number;
  size: number;
};

const DENSITY = 0.00011;
const MIN_STARS = 48;
const MAX_STARS = 240;
/** ~0.00022 rad/frame @60fps ≈ 8 min per full turn */
const OMEGA = 0.00022;

export function DreamField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let rafId = 0;
    let rotation = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const colorFor = (hue: number, alpha: number) => {
      if (hue < 0.25) return `rgba(255, 225, 240, ${alpha})`;
      if (hue < 0.55) return `rgba(255, 170, 215, ${alpha})`;
      if (hue < 0.8) return `rgba(185, 160, 255, ${alpha})`;
      return `rgba(150, 220, 255, ${alpha})`;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        MAX_STARS,
        Math.max(MIN_STARS, Math.floor(width * height * DENSITY))
      );
      const maxR = Math.hypot(width, height) * 0.55;

      stars = new Array(count).fill(0).map(() => ({
        angle: Math.random() * Math.PI * 2,
        r: 40 + Math.random() * maxR,
        z: Math.random() * 0.85 + 0.15,
        tw: Math.random() * Math.PI * 2,
        twSpeed: 0.006 + Math.random() * 0.014,
        hue: Math.random(),
        size: Math.random() * 1.1 + 0.25,
      }));
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.48;

      if (!reduceMotion) {
        rotation += OMEGA;
      }

      for (const s of stars) {
        s.tw += s.twSpeed;
        const layerDrift = s.z < 0.32 ? -0.3 : 1;
        const a = s.angle + rotation * layerDrift * (0.85 + s.z * 0.15);
        const x = cx + Math.cos(a) * s.r;
        const y = cy + Math.sin(a) * s.r;
        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) continue;

        const tw = 0.35 + Math.sin(s.tw) * 0.25;
        const alpha = tw * (0.35 + s.z * 0.45);
        const r = s.size * (0.55 + s.z * 0.55);

        ctx.beginPath();
        const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
        halo.addColorStop(0, colorFor(s.hue, alpha * 0.4));
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = halo;
        ctx.arc(x, y, r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = colorFor(s.hue, Math.min(1, alpha + 0.15));
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full dream-field-canvas"
    />
  );
}
