"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

type Variant = "up" | "left" | "right" | "scale" | "blur";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  once?: boolean;
  className?: string;
};

export function Reveal({
  children,
  as,
  variant = "up",
  delay = 0,
  once = true,
  className = "",
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      el.classList.add("reveal--in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--in");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("reveal--in");
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      data-variant={variant}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
