import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types/user.type";
import Loading from "@/components/Loading";
import path from "@/constants/path";

/**
 * RejectedRoute Component
 *
 * This component is used for routes that should only be accessible
 * when the user is NOT authenticated (e.g., login, register pages)
 *
 * If user is already authenticated, redirect them to their role-specific home
 */
export default function RejectedRoute() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  // If authenticated, redirect to role-specific home
  if (isAuthenticated && user) {
    const homePath = getUserHomePath(user.role);
    return <Navigate to={homePath} replace />;
  }

  // Not authenticated - allow access to this route
  return <Outlet />;
}

function getUserHomePath(role: UserRole): string {
  switch (role) {
    case "student":
      return path.student;
    case "tutor":
      return path.tutor;
    case "admin":
      return "/admin";
    default:
      return path.home;
  }
}
