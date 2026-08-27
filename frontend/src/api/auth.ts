import apiClient from "./client";
import type { LoginCredentials, LoginResponse, AuthUser } from "../types/auth";

export async function loginRequest(
  Credentials: LoginCredentials,
): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(
    "auth/login",
    Credentials,
  );
  return data;
}

export async function logoutRequest(): Promise<void> {
  await apiClient.post<"auth/logout">;
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const { data } = await apiClient.get<AuthUser>("auth/me");
  return data;
}
