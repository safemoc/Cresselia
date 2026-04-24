"use client";

import { useId, useState } from "react";

import type { DreamQueueAggregate, DreamTask } from "../useDreamQueue";

export function AggregateProgressRail({
  tasks,
  aggregate,
}: {
  tasks: DreamTask[];
  aggregate: DreamQueueAggregate;
}) {
  const tipId = useId();
  const [open, setOpen] = useState(false);
  const pct = aggregate.total === 0 ? 0 : aggregate.percent;
  const fillPct = Math.min(100, Math.max(0, pct));

  return (
    <aside
      className="dream-rail fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 sm:block md:right-6"
      aria-label="梦境队列总进度"
    >
      <div className="relative flex flex-col items-center gap-4">
        <div className="text-center font-serif-cn text-[10px] tracking-[0.24em] text-[color:var(--ink-muted)]">
          总进度
        </div>
        <div
          className="relative h-[min(86vh,1000px)] w-[14px] rounded-full border border-white/10 bg-white/[0.04] shadow-[inset_0_0_12px_rgba(0,0,0,0.35)]"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          tabIndex={0}
          role="img"
          aria-describedby={tasks.length ? tipId : undefined}
        >
          <span
            aria-hidden
            className={[
              "absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-[160%] rounded-full",
              "bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,142,199,0.85)_38%,rgba(122,216,255,0.25)_70%,transparent_100%)]",
              fillPct > 0 ? "shadow-[0_0_18px_rgba(255,142,199,0.7)]" : "opacity-60",
            ].join(" ")}
          />
          <div
            className="absolute inset-x-0 bottom-0 rounded-full bg-gradient-to-t from-[color:var(--moon-magenta)] via-[color:var(--moon-violet)] to-[color:var(--moon-cyan)] opacity-90 transition-[height] duration-500 ease-out"
            style={{ height: `${fillPct}%` }}
          />
        </div>
        <div className="max-w-[7rem] text-center">
          <p className="font-display text-lg font-semibold tabular-nums text-white">
            {pct}%
          </p>
          <p className="mt-1 font-serif-cn text-[10px] leading-snug text-[color:var(--ink-soft)]">
            {aggregate.runningCount > 0
              ? `${aggregate.runningCount} 个梦境同织`
              : aggregate.total > 0
                ? "队列已静"
                : "尚无梦境"}
          </p>
        </div>

        {tasks.length > 0 && open ? (
          <div
            id={tipId}
            className="dream-rail-tooltip absolute right-full mr-4 top-1/2 w-56 -translate-y-1/2 rounded-2xl border border-white/10 bg-[rgba(10,8,32,0.92)] px-3 py-3 text-left shadow-xl backdrop-blur-md"
          >
            <p className="font-display text-[9px] tracking-[0.35em] text-[color:var(--moon-rose)]">
              QUEUE
            </p>
            <ul className="mt-2 max-h-40 space-y-2 overflow-y-auto text-xs text-[color:var(--ink-soft)]">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="flex items-start justify-between gap-2 border-b border-white/5 pb-2 last:border-0 last:pb-0"
                >
                  <span className="line-clamp-2 flex-1">{t.prompt}</span>
                  <span className="shrink-0 font-mono text-[color:var(--ink-muted)]">
                    {t.status === "done" ? "✓" : `${t.progress}%`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
