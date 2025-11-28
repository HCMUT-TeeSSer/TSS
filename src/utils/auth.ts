import type { User, UserRole } from "@/types/user.type";

// Local Storage Keys
const AUTH_USER_KEY = "auth_user";
const SEED_DATA_KEY = "seed_data_initialized";

/**
 * Sample user accounts representing different roles
 * In production, passwords should be hashed and authentication
 * should be handled by a backend API
 */
export const sampleUsers: User[] = [
  {
    id: "user_001",
    username: "student01",
    password: "Student@123", // Plain text for demo only
    email: "student01@hcmut.edu.vn",
    fullName: "Nguyễn Văn A",
    role: "student",
    avatar: "https://i.pravatar.cc/150?img=1",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "user_002",
    username: "tutor01",
    password: "Tutor@123",
    email: "tutor01@hcmut.edu.vn",
    fullName: "Trần Thị B",
    role: "tutor",
    avatar: "https://i.pravatar.cc/150?img=2",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "user_003",
    username: "admin01",
    password: "Admin@123",
    email: "admin01@hcmut.edu.vn",
    fullName: "Lê Văn C",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=3",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
];

/**
 * Initialize seed data in localStorage
 * This simulates having a database with sample users
 */
export const initializeSeedData = (): void => {
  const isInitialized = localStorage.getItem(SEED_DATA_KEY);

  if (!isInitialized) {
    localStorage.setItem("users", JSON.stringify(sampleUsers));
    localStorage.setItem(SEED_DATA_KEY, "true");
    console.log("✅ Seed data initialized with sample users");
    console.table(
      sampleUsers.map((u) => ({
        Username: u.username,
        Password: u.password,
        Role: u.role,
        Email: u.email,
      }))
    );
  }
};

/**
 * Get all users from localStorage
 */
export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem("users");
  return usersJson ? (JSON.parse(usersJson) as User[]) : [];
};

/**
 * Authenticate user with username and password
 * @returns User object if credentials are valid, null otherwise
 */
export const authenticateUser = (username: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find((u) => u.username === username && u.password === password && u.isActive);

  return user ?? null;
};

/**
 * Save authenticated user to localStorage
 */
export const saveAuthUser = (user: User): void => {
  // Don't store password in auth session
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userWithoutPassword));
};

/**
 * Get currently authenticated user from localStorage
 */
export const getAuthUser = (): User | null => {
  const userJson = localStorage.getItem(AUTH_USER_KEY);
  return userJson ? (JSON.parse(userJson) as User) : null;
};

/**
 * Remove authenticated user from localStorage (logout)
 */
export const removeAuthUser = (): void => {
  localStorage.removeItem(AUTH_USER_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getAuthUser() !== null;
};

/**
 * Check if authenticated user has required role
 * @param requiredRoles - Array of roles that are allowed
 * @returns true if user has one of the required roles
 */
export const hasRole = (requiredRoles: UserRole[]): boolean => {
  const user = getAuthUser();
  if (!user) return false;

  return requiredRoles.includes(user.role);
};

/**
 * Get user's role
 */
export const getUserRole = (): UserRole | null => {
  const user = getAuthUser();
  return user?.role ?? null;
};

/**
 * Login function
 */
export const login = (username: string, password: string): { success: boolean; user?: User; error?: string } => {
  const user = authenticateUser(username, password);

  if (user) {
    saveAuthUser(user);
    return { success: true, user };
  }

  return { success: false, error: "Tên đăng nhập hoặc mật khẩu không đúng" };
};

/**
 * Logout function
 */
export const logout = (): void => {
  removeAuthUser();
};
