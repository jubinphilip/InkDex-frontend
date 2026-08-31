import { getToken } from "@/lib/token";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

type Method = "GET" | "POST" | "DELETE";

interface RequestOptions {
  method?: Method;
  body?: Record<string, unknown> | FormData;
  auth?: boolean;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = true } = options;

  const headers: HeadersInit = {};

  if (auth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const isFormData = body instanceof FormData;
  if (body && !isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "Something went wrong" }));
    throw new Error(errorData.detail ?? `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: "GET" }),
  post: <T>(endpoint: string, body: Record<string, unknown>, auth = true) =>
    request<T>(endpoint, { method: "POST", body, auth }),
  postForm: <T>(endpoint: string, body: FormData) =>
    request<T>(endpoint, { method: "POST", body }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};
