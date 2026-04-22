"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { api, ApiError } from "@/lib/api";

import {
  AuthAside,
  AuthCard,
  AuthFooterLink,
} from "../_components/AuthCard";
import { MoonInput } from "../_components/MoonInput";
import { SubmitMoonButton } from "../_components/SubmitMoonButton";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      await api.auth.login({ email, password, remember });
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "月光暂时接不通，请稍后再试。";
      setError(message);
      setShakeKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      eyebrow="Glimmer · Sign In"
      title="归来"
      description={
        <>
          月色温柔，新月已为你守候。
          <br className="hidden sm:block" />
          输入你的邮箱与密码，继续未完的梦境。
        </>
      }
      aside={
        <AuthAside
          poem={
            <>
              愿每一次归来，
              <br />
              都像新月升起一样平稳。
            </>
          }
          caption="RETURN TO THE DREAM"
        />
      }
      footer={
        <AuthFooterLink
          prompt="还未拥有梦境？"
          href="/register"
          label="前往织梦"
        />
      }
    >
      <form
        key={shakeKey}
        onSubmit={onSubmit}
        className={`space-y-5 ${error ? "shake" : ""}`}
        noValidate
      >
        <MoonInput
          label="邮箱"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MoonInput
          label="密码"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between text-xs tracking-[0.2em] text-[color:var(--ink-muted)]">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-white/30 bg-transparent accent-[color:var(--moon-rose)]"
            />
            <span className="font-serif-cn tracking-[0.3em]">记住我</span>
          </label>
          <span
            className="font-serif-cn tracking-[0.3em] opacity-60"
            title="敬请期待"
          >
            忘记密码？
          </span>
        </div>

        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-[rgba(255,120,140,0.35)] bg-[rgba(255,120,140,0.08)] px-4 py-3 text-sm leading-relaxed text-[#ffb8c2]"
          >
            {error}
          </div>
        ) : null}

        <SubmitMoonButton loading={loading}>开启梦境</SubmitMoonButton>
      </form>
    </AuthCard>
  );
}
