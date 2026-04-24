"use client";

const DUST = [
  { left: "10%", top: "16%", size: 110, delay: "0s", duration: "13s" },
  { left: "22%", top: "68%", size: 72, delay: "1.5s", duration: "10s" },
  { left: "36%", top: "30%", size: 88, delay: "3.2s", duration: "14s" },
  { left: "63%", top: "14%", size: 96, delay: "2.1s", duration: "12s" },
  { left: "78%", top: "62%", size: 68, delay: "4.4s", duration: "9s" },
  { left: "90%", top: "28%", size: 84, delay: "1s", duration: "11s" },
];

export function HeroOrnaments() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="hero-crescent float-soft absolute right-[16%] top-[10%] h-56 w-56 text-[color:var(--moon-rose)] opacity-70 sm:h-72 sm:w-72">
          <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
            <defs>
              <radialGradient id="hero-crescent-grad" cx="40%" cy="40%" r="70%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="55%" stopColor="currentColor" />
                <stop offset="100%" stopColor="#7ad8ff" />
              </radialGradient>
            </defs>
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
              fill="url(#hero-crescent-grad)"
            />
          </svg>
        </div>

        <svg
          viewBox="0 0 360 180"
          className="hero-constellation absolute left-[8%] top-[11%] h-32 w-64 opacity-80"
          fill="none"
          aria-hidden
        >
          <path
            d="M20 110L84 44L148 72L216 32L286 58L338 22"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.2"
          />
          <circle cx="20" cy="110" r="3.4" fill="rgba(255,255,255,0.7)" />
          <circle cx="84" cy="44" r="2.8" fill="rgba(255,142,199,0.75)" />
          <circle cx="148" cy="72" r="3" fill="rgba(255,255,255,0.68)" />
          <circle cx="216" cy="32" r="3.6" fill="rgba(122,216,255,0.82)" />
          <circle cx="286" cy="58" r="2.8" fill="rgba(255,255,255,0.62)" />
          <circle cx="338" cy="22" r="3.2" fill="rgba(183,143,255,0.8)" />
        </svg>

        <svg
          viewBox="0 0 280 200"
          className="hero-constellation absolute bottom-[16%] right-[8%] h-36 w-56 opacity-70"
          fill="none"
          aria-hidden
        >
          <path
            d="M18 148L78 106L132 134L184 72L250 96"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.1"
          />
          <circle cx="18" cy="148" r="3" fill="rgba(255,255,255,0.68)" />
          <circle cx="78" cy="106" r="2.8" fill="rgba(183,143,255,0.72)" />
          <circle cx="132" cy="134" r="2.4" fill="rgba(255,255,255,0.55)" />
          <circle cx="184" cy="72" r="3.4" fill="rgba(255,142,199,0.8)" />
          <circle cx="250" cy="96" r="3" fill="rgba(122,216,255,0.8)" />
        </svg>

        {DUST.map((dust, index) => (
          <span
            key={index}
            className="hero-dust absolute rounded-full"
            style={{
              left: dust.left,
              top: dust.top,
              width: dust.size,
              height: dust.size,
              animationDelay: dust.delay,
              animationDuration: dust.duration,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[18%] z-[2] -translate-x-1/2 text-center">
        <p className="font-display text-[10px] tracking-[0.5em] text-[color:var(--moon-rose)]">
          DREAMSCAPE
        </p>
        <h1 className="mt-4 font-serif-cn text-3xl font-semibold text-gradient-moon sm:text-4xl">
          今夜，你想织什么梦？
        </h1>
        <p className="mt-4 font-serif-cn text-sm leading-relaxed text-[color:var(--ink-soft)]">
          让一段愿望、几张灵感参考图，慢慢沉入这片月色。
        </p>
      </div>
    </>
  );
}
