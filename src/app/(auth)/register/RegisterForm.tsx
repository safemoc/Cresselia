"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

import { api, ApiError } from "@/lib/api";

import {
  AuthAside,
  AuthCard,
  AuthFooterLink,
} from "../_components/AuthCard";
import { MoonInput } from "../_components/MoonInput";
import { SubmitMoonButton } from "../_components/SubmitMoonButton";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

type FieldErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirm?: string;
  code?: string;
};

export function RegisterForm({ initialEmail }: { initialEmail: string }) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = window.setTimeout(() => {
      setCooldown((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [cooldown]);

  function validateForSendCode(): boolean {
    const next: FieldErrors = {};

    if (!username.trim()) {
      next.username = "用户名不能为空。";
    }
    if (!EMAIL_PATTERN.test(email)) {
      next.email = "请输入有效的邮箱地址。";
    }
    if (password.length < 6) {
      next.password = "密码至少 6 位。";
    }

    setFieldErrors((prev) => ({
      ...prev,
      username: next.username,
      email: next.email,
      password: next.password,
    }));

    return Object.keys(next).length === 0;
  }

  function validateForSubmit(): boolean {
    const next: FieldErrors = {};

    if (!username.trim()) {
      next.username = "用户名不能为空。";
    }
    if (!EMAIL_PATTERN.test(email)) {
      next.email = "请输入有效的邮箱地址。";
    }
    if (password.length < 6) {
      next.password = "密码至少 6 位。";
    }
    if (confirm !== password) {
      next.confirm = "两次输入的密码不一致。";
    }
    if (!new RegExp(`^\\d{${CODE_LENGTH}}$`).test(code)) {
      next.code = "请输入 6 位数字验证码。";
    }

    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSendCode() {
    if (loading || sendingCode || cooldown > 0) return;

    setError(null);
    setNotice(null);

    if (!validateForSendCode()) {
      setShakeKey((k) => k + 1);
      return;
    }

    setSendingCode(true);
    try {
      const response = await api.auth.sendRegisterCode({
        username: username.trim(),
        email,
        password,
      });

      setNotice(response.message);
      setCooldown(RESEND_SECONDS);
      setFieldErrors((prev) => ({ ...prev, code: undefined }));
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "月光暂时接不通，请稍后再试。";
      setError(message);
      setShakeKey((k) => k + 1);
    } finally {
      setSendingCode(false);
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading || sendingCode) return;
    setError(null);
    setNotice(null);
    if (!validateForSubmit()) {
      setShakeKey((k) => k + 1);
      return;
    }
    setLoading(true);
    try {
      await api.auth.register({
        username: username.trim(),
        email,
        code,
        password,
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
          留下你的用户名、邮箱与密码，
          <br className="hidden sm:block" />
          收到验证码后，就能点亮第一枚新月。
        </>
      }
      aside={
        <AuthAside
          poem={
            <>
              新月初生，
              <br />
              验证过的名字，
              <br />
              会被写进第一夜好梦。
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
          label="用户名"
          type="text"
          name="username"
          autoComplete="username"
          required
          maxLength={32}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setNotice(null);
            if (fieldErrors.username)
              setFieldErrors((prev) => ({ ...prev, username: undefined }));
          }}
          error={fieldErrors.username ?? null}
          hint={!fieldErrors.username ? "注册后将作为你的登录名" : undefined}
        />
        <MoonInput
          label="邮箱"
          type="email"
          name="email"
          autoComplete="email"
          required
          className="pr-40"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setNotice(null);
            if (fieldErrors.email)
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={fieldErrors.email ?? null}
          adornment={
            <button
              type="button"
              onClick={onSendCode}
              disabled={loading || sendingCode || cooldown > 0}
              className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] font-semibold tracking-[0.22em] text-[color:var(--moon-rose)] transition hover:border-[color:var(--moon-rose)] hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sendingCode
                ? "发送中"
                : cooldown > 0
                  ? `${cooldown}s后重发`
                  : "发送验证码"}
            </button>
          }
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
            setNotice(null);
            if (fieldErrors.password)
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
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
            if (error) setError(null);
            if (fieldErrors.confirm)
              setFieldErrors((prev) => ({ ...prev, confirm: undefined }));
          }}
          error={fieldErrors.confirm ?? null}
        />
        <MoonInput
          label="验证码"
          type="text"
          name="code"
          autoComplete="one-time-code"
          inputMode="numeric"
          required
          maxLength={CODE_LENGTH}
          value={code}
          onChange={(e) => {
            setCode(e.target.value.replace(/\D/g, "").slice(0, CODE_LENGTH));
            if (fieldErrors.code)
              setFieldErrors((prev) => ({ ...prev, code: undefined }));
          }}
          error={fieldErrors.code ?? null}
          hint={!fieldErrors.code ? "请输入邮件中的 6 位数字验证码" : undefined}
        />

        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-[rgba(255,120,140,0.35)] bg-[rgba(255,120,140,0.08)] px-4 py-3 text-sm leading-relaxed text-[#ffb8c2]"
          >
            {error}
          </div>
        ) : null}
        {notice ? (
          <div
            role="status"
            className="rounded-xl border border-[rgba(122,216,255,0.28)] bg-[rgba(122,216,255,0.08)] px-4 py-3 text-sm leading-relaxed text-[color:var(--moon-cyan)]"
          >
            {notice}
          </div>
        ) : null}

        <SubmitMoonButton loading={loading} loadingLabel="织梦中…">
          织下梦境
        </SubmitMoonButton>
      </form>
    </AuthCard>
  );
}
