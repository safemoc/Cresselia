/**
 * 业务 API 聚合层。
 *
 * 浏览器侧统一从这里调：`import { api } from "@/lib/api"`。
 * 所有路径都打到 Next.js BFF（`/api/*`），由 BFF 转发到 Rust axum。
 *
 * NOTE: 下面的类型都是**占位**。拿到 axum 真实接口定义后，替换这些 type 即可，
 * UI 层无需修改。
 */

import { http } from "./client";

/* -------------------------------------------------------------------------- */
/*                                  Auth                                      */
/* -------------------------------------------------------------------------- */

export interface UserProfile {
  id: string;
  email: string;
  nickname?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface LoginInput {
  email: string;
  password: string;
  /** 是否记住登录状态（影响 cookie 过期时间）。 */
  remember?: boolean;
}

export interface RegisterInput {
  email: string;
  password: string;
  nickname?: string;
}

export interface AuthResponse {
  user: UserProfile;
}

/* -------------------------------------------------------------------------- */
/*                               API root                                     */
/* -------------------------------------------------------------------------- */

export const api = {
  auth: {
    login: (body: LoginInput) =>
      http.post<AuthResponse, LoginInput>("/api/auth/login", body),

    register: (body: RegisterInput) =>
      http.post<AuthResponse, RegisterInput>("/api/auth/register", body),

    me: () => http.get<UserProfile>("/api/auth/me"),

    logout: () => http.post<void>("/api/auth/logout"),
  },
};

export type Api = typeof api;
