/**
 * 统一的 API 错误类型。
 *
 * - {@link ApiError} 代表后端返回的非 2xx 响应（有 status / code / message）。
 * - {@link NetworkError} 代表请求未能到达后端（断网、超时、CORS 等）。
 *
 * 所有业务代码都应基于这两个类做分支，不要直接 catch 原生 `Error`。
 */

export interface ApiErrorPayload {
  code?: string;
  message?: string;
  details?: unknown;
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(
    status: number,
    code: string,
    message: string,
    details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  static fromPayload(status: number, payload: ApiErrorPayload): ApiError {
    return new ApiError(
      status,
      payload.code ?? `HTTP_${status}`,
      payload.message ?? defaultMessageForStatus(status),
      payload.details
    );
  }

  /** 401 未鉴权。前端可据此触发跳转到 /login。 */
  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  /** 403 没权限。 */
  get isForbidden(): boolean {
    return this.status === 403;
  }
}

export class NetworkError extends Error {
  public readonly cause?: unknown;

  constructor(message = "网络异常，请稍后重试。", cause?: unknown) {
    super(message);
    this.name = "NetworkError";
    this.cause = cause;
  }
}

function defaultMessageForStatus(status: number): string {
  if (status === 400) return "请求参数有误。";
  if (status === 401) return "请先登录。";
  if (status === 403) return "没有权限访问。";
  if (status === 404) return "资源不存在。";
  if (status === 409) return "请求冲突。";
  if (status === 422) return "参数校验失败。";
  if (status === 429) return "请求过于频繁，请稍后再试。";
  if (status >= 500) return "服务端暂时打盹，请稍候再来。";
  return "请求失败。";
}
