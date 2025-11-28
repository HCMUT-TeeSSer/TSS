import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/user.type";
import { getAuthUser, login as authLogin, logout as authLogout, initializeSeedData } from "@/utils/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize seed data immediately
    initializeSeedData();
    // Get current user from localStorage
    return getAuthUser();
  });
  const loading = false;

  const login = (username: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
    return new Promise((resolve) => {
      const result = authLogin(username, password);

      if (result.success && result.user) {
        setUser(result.user);
        resolve({ success: true, user: result.user });
      } else {
        resolve({ success: false, error: result.error });
      }
    });
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Export AuthContext for use in custom hooks
export { AuthContext };
