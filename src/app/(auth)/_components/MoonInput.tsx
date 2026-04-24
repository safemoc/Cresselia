"use client";

import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

type BaseProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export interface MoonInputProps extends BaseProps {
  label: string;
  type?: "email" | "text" | "password";
  /** 错误提示文案；有值时显示错误态 + 红色描边。 */
  error?: string | null;
  /** 右侧自定义操作图标（例如密码可见切换）。 */
  adornment?: ReactNode;
  /** 辅助说明，显示在输入框下方。 */
  hint?: ReactNode;
}

export const MoonInput = forwardRef<HTMLInputElement, MoonInputProps>(
  function MoonInput(
    {
      label,
      type = "text",
      error,
      adornment,
      hint,
      id,
      className = "",
      required,
      ...rest
    },
    ref
  ) {
    const reactId = useId();
    const inputId = id ?? `mf-${reactId}`;
    const [revealed, setRevealed] = useState(false);

    const isPassword = type === "password";
    const effectiveType = isPassword && revealed ? "text" : type;

    return (
      <div className={`moon-field ${error ? "moon-field--error" : ""}`}>
        <input
          {...rest}
          id={inputId}
          ref={ref}
          type={effectiveType}
          required={required}
          placeholder=" "
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={
            error
              ? `${inputId}-err`
              : hint
                ? `${inputId}-hint`
                : undefined
          }
          className={`moon-field__control ${className}`}
        />
        <label htmlFor={inputId} className="moon-field__label">
          {label}
          {required ? (
            <span aria-hidden className="ml-1 text-[color:var(--moon-rose)]">
              ·
            </span>
          ) : null}
        </label>
        <span className="moon-field__underline" aria-hidden />

        {isPassword && !adornment ? (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            className="moon-field__toggle"
            aria-label={revealed ? "隐藏密码" : "显示密码"}
          >
            {revealed ? <EyeOff /> : <Eye />}
          </button>
        ) : null}
        {adornment ? <div className="moon-field__adornment">{adornment}</div> : null}

        {error ? (
          <p
            id={`${inputId}-err`}
            className="mt-2 pl-2 text-xs tracking-[0.2em] text-[#ff9fb0]"
          >
            {error}
          </p>
        ) : hint ? (
          <p
            id={`${inputId}-hint`}
            className="mt-2 pl-2 text-xs tracking-[0.2em] text-[color:var(--ink-muted)]"
          >
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

function Eye() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M3 3l18 18M10.6 10.6A2 2 0 0013.4 13.4M6.7 6.7C4.3 8.3 2 12 2 12s3.5 7 10 7a10.9 10.9 0 005.3-1.4M9.9 4.2A11.6 11.6 0 0112 4c6.5 0 10 7 10 7a18 18 0 01-3.1 4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
