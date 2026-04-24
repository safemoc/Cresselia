"use client";

type LaunchDreamStarOptions = {
  fromEl: HTMLElement | null;
  historyAnchorId: string;
};

function emitDreamArrived() {
  window.dispatchEvent(new CustomEvent("dream:arrived"));
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export async function launchDreamStar({
  fromEl,
  historyAnchorId,
}: LaunchDreamStarOptions) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const historyEl = document.getElementById(historyAnchorId);
  if (!fromEl || prefersReducedMotion()) {
    emitDreamArrived();
    return;
  }

  const startRect = fromEl.getBoundingClientRect();
  const historyRect = historyEl?.getBoundingClientRect();
  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;
  const midX = clamp(window.innerWidth * 0.54, 120, window.innerWidth - 120);
  const apexY = window.innerHeight * 0.22;
  const targetX = clamp(
    midX + (Math.random() * 160 - 80),
    80,
    window.innerWidth - 80
  );
  const targetY = historyRect
    ? Math.min(window.innerHeight - 24, historyRect.top + 40)
    : window.innerHeight - 36;

  const star = document.createElement("div");
  star.className = "dream-star";
  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;
  document.body.appendChild(star);

  try {
    star.classList.add("dream-star--spawn");

    await star
      .animate(
        [
          {
            left: `${startX}px`,
            top: `${startY}px`,
            transform: "translate(-50%, -50%) scale(0.2)",
            opacity: 0,
          },
          {
            left: `${startX}px`,
            top: `${startY}px`,
            transform: "translate(-50%, -50%) scale(1.2)",
            opacity: 1,
          },
        ],
        {
          duration: 420,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        }
      )
      .finished;

    star.classList.remove("dream-star--spawn");

    await star
      .animate(
        [
          {
            left: `${startX}px`,
            top: `${startY}px`,
            transform: "translate(-50%, -50%) scale(1.08)",
            opacity: 1,
          },
          {
            left: `${midX}px`,
            top: `${apexY}px`,
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 1,
          },
        ],
        {
          duration: 620,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "forwards",
        }
      )
      .finished;

    await star
      .animate(
        [
          {
            left: `${midX}px`,
            top: `${apexY}px`,
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 1,
          },
          {
            left: `${midX}px`,
            top: `${apexY}px`,
            transform: "translate(-50%, -50%) scale(1.05)",
            opacity: 1,
          },
        ],
        {
          duration: 140,
          easing: "ease-out",
          fill: "forwards",
        }
      )
      .finished;

    star.classList.add("dream-star--meteor");

    await star
      .animate(
        [
          {
            left: `${midX}px`,
            top: `${apexY}px`,
            transform: "translate(-50%, -50%) rotate(-90deg) scale(1.15)",
            opacity: 1,
          },
          {
            left: `${midX + (targetX - midX) * 0.45}px`,
            top: `${apexY + (targetY - apexY) * 0.22}px`,
            transform: "translate(-50%, -50%) rotate(-88deg) scale(1.05)",
            opacity: 0.95,
            offset: 0.45,
          },
          {
            left: `${targetX}px`,
            top: `${targetY}px`,
            transform: "translate(-50%, -50%) rotate(-92deg) scale(0.75)",
            opacity: 0.4,
          },
        ],
        {
          duration: 1100,
          easing: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
          fill: "forwards",
        }
      )
      .finished;
  } finally {
    star.remove();
    emitDreamArrived();
  }
}
