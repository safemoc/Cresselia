"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  tw: number;
  twSpeed: number;
  hue: number;
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

export function StarField({ density = 0.00018 }: { density?: number }) {
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
    const shooters: Shooter[] = [];
    let scrollOffset = 0;
    let rafId = 0;
    let lastShooterAt = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        Math.max(140, Math.floor(width * height * density)),
        520
      );
      stars = new Array(count).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * (height * 2),
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.4 + 0.2,
        tw: Math.random() * Math.PI * 2,
        twSpeed: 0.008 + Math.random() * 0.02,
        hue: Math.random(),
      }));
    };

    const onScroll = () => {
      scrollOffset = window.scrollY;
    };

    const colorFor = (hue: number, alpha: number) => {
      // Palette around Cresselia tones: rose, violet, cyan, white
      if (hue < 0.25) return `rgba(255, 225, 240, ${alpha})`;
      if (hue < 0.55) return `rgba(255, 170, 215, ${alpha})`;
      if (hue < 0.8) return `rgba(185, 160, 255, ${alpha})`;
      return `rgba(150, 220, 255, ${alpha})`;
    };

    const spawnShooter = () => {
      const fromLeft = Math.random() > 0.5;
      const y = Math.random() * height * 0.6;
      const speed = 8 + Math.random() * 6;
      shooters.push({
        x: fromLeft ? -20 : width + 20,
        y,
        vx: (fromLeft ? 1 : -1) * speed,
        vy: speed * 0.35,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        s.tw += s.twSpeed;
        const parallax = scrollOffset * 0.15 * s.z;
        const y = ((s.y - parallax) % (height * 2) + height * 2) % (height * 2);
        const drawY = y - height * 0.5;
        if (drawY < -10 || drawY > height + 10) continue;
        const alpha = (0.35 + Math.sin(s.tw) * 0.35) * (0.4 + s.z * 0.6);
        const r = s.r * (0.6 + s.z);

        // Soft halo
        ctx.beginPath();
        const halo = ctx.createRadialGradient(s.x, drawY, 0, s.x, drawY, r * 6);
        halo.addColorStop(0, colorFor(s.hue, alpha * 0.35));
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = halo;
        ctx.arc(s.x, drawY, r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = colorFor(s.hue, Math.min(1, alpha + 0.2));
        ctx.arc(s.x, drawY, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shooting stars
      if (!reduceMotion) {
        const now = performance.now();
        if (now - lastShooterAt > 5200 && Math.random() > 0.6) {
          lastShooterAt = now;
          spawnShooter();
        }
        for (let i = shooters.length - 1; i >= 0; i--) {
          const sh = shooters[i];
          sh.x += sh.vx;
          sh.y += sh.vy;
          sh.life += 1;
          const t = sh.life / sh.maxLife;
          const alpha = Math.sin(t * Math.PI);
          const tailLen = 120;
          const grad = ctx.createLinearGradient(
            sh.x,
            sh.y,
            sh.x - sh.vx * (tailLen / Math.hypot(sh.vx, sh.vy)),
            sh.y - sh.vy * (tailLen / Math.hypot(sh.vx, sh.vy))
          );
          grad.addColorStop(0, `rgba(255, 220, 240, ${alpha})`);
          grad.addColorStop(1, `rgba(255, 220, 240, 0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(
            sh.x - sh.vx * (tailLen / Math.hypot(sh.vx, sh.vy)),
            sh.y - sh.vy * (tailLen / Math.hypot(sh.vx, sh.vy))
          );
          ctx.stroke();
          if (sh.life > sh.maxLife) shooters.splice(i, 1);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 h-screen w-screen"
    />
  );
}
