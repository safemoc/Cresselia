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

export function RegisterForm({ initialEmail }: { initialEmail: string }) {
  const router = useRouter();

  const [email, setEmail] = useState(initialEmail);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    password?: string;
    confirm?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  function validate(): boolean {
    const next: { password?: string; confirm?: string } = {};
    if (password.length < 6) {
      next.password = "密码至少 6 位。";
    }
    if (confirm !== password) {
      next.confirm = "两次输入的密码不一致。";
    }
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    if (!validate()) {
      setShakeKey((k) => k + 1);
      return;
    }
    setLoading(true);
    try {
      await api.auth.register({
        email,
        password,
        nickname: nickname || undefined,
      });
      router.push("/");
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
      eyebrow="Weave · Sign Up"
      title="织下梦境"
      description={
        <>
          留下你的邮箱与心愿，
          <br className="hidden sm:block" />
          Cresselia 正为你点亮第一枚新月。
        </>
      }
      aside={
        <AuthAside
          poem={
            <>
              新月初生，
              <br />
              为你写下第一页好梦。
            </>
          }
          caption="BEGIN THE DREAM"
        />
      }
      footer={
        <AuthFooterLink
          prompt="已有梦境账户？"
          href="/login"
          label="归来"
        />
      }
    >
      <form
        key={shakeKey}
        onSubmit={onSubmit}
        className={`space-y-5 ${error || Object.keys(fieldErrors).length ? "shake" : ""}`}
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
          label="昵称（可选）"
          type="text"
          name="nickname"
          autoComplete="nickname"
          maxLength={32}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          hint="月下如何称呼你？"
        />
        <MoonInput
          label="密码"
          type="password"
          name="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (fieldErrors.password)
              setFieldErrors((p) => ({ ...p, password: undefined }));
          }}
          error={fieldErrors.password ?? null}
          hint={!fieldErrors.password ? "至少 6 位" : undefined}
        />
        <MoonInput
          label="再次输入密码"
          type="password"
          name="confirm"
          autoComplete="new-password"
          required
          minLength={6}
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            if (fieldErrors.confirm)
              setFieldErrors((p) => ({ ...p, confirm: undefined }));
          }}
          error={fieldErrors.confirm ?? null}
        />

        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-[rgba(255,120,140,0.35)] bg-[rgba(255,120,140,0.08)] px-4 py-3 text-sm leading-relaxed text-[#ffb8c2]"
          >
            {error}
          </div>
        ) : null}

        <SubmitMoonButton loading={loading} loadingLabel="织梦中…">
          织下梦境
        </SubmitMoonButton>
      </form>
    </AuthCard>
  );
}
