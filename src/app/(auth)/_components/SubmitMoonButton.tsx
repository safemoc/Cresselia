"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface SubmitMoonButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingLabel?: ReactNode;
  children: ReactNode;
}

export function SubmitMoonButton({
  loading = false,
  loadingLabel = "唤月中…",
  disabled,
  children,
  className = "",
  ...rest
}: SubmitMoonButtonProps) {
  return (
    <button
      {...rest}
      type={rest.type ?? "submit"}
      disabled={loading || disabled}
      aria-busy={loading || undefined}
      className={`btn-moon w-full ${className}`}
    >
      {loading ? (
        <>
          <SpinMoon />
          <span>{loadingLabel}</span>
        </>
      ) : (
        <>
          {children}
          <Sparkle />
        </>
      )}
    </button>
  );
}

function SpinMoon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden
      className="spin-moon"
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
        fill="currentColor"
      />
    </svg>
  );
}

function Sparkle() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2z"
        fill="currentColor"
      />
    </svg>
  );
}
