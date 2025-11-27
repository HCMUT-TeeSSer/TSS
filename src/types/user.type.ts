export type UserRole = "student" | "tutor" | "admin";

export interface User {
  id: string;
  username: string;
  password: string; // In production, this should be hashed
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
