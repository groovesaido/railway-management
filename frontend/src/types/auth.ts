export interface LoginCredentials {
  email: String;
  password: string;
}

export type Role = "ADMIN" | "PASSENGER" | "STAFF";

export interface AuthUser {
  id: String;
  email: string;
  role: Role;
}

export interface LoginResponse {
  user: AuthUser;
}
