import {
  createContext,
  useEffect,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { LoginCredentials, Role, AuthUser } from "../types/auth";
import { loginRequest, logoutRequest, fetchCurrentUser } from "../api/auth";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: Boolean;
  login: (Credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: Role) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //on first load
  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);
  const login = async (Credentials: LoginCredentials) => {
    const { user } = await loginRequest(Credentials);
    setUser(user);
  };
  const logout = async () => {
    await logoutRequest;
    setUser(null);
  };
  const hasRole = (role: Role) => user?.role === role;

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within the AuthProvider");
  return context;
}
