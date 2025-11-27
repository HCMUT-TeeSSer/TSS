import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types/user.type";
import Loading from "@/components/Loading";
import path from "@/constants/path";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

/**
 * ProtectedRoute Component
 *
 * This component protects routes by checking:
 * 1. If user is authenticated
 * 2. If user has the required role (if specified)
 *
 * @param allowedRoles - Array of roles that can access this route
 * @param redirectTo - Custom redirect path (defaults to /login)
 *
 * Flow:
 * 1. Show loading while checking auth state
 * 2. If not authenticated -\> redirect to login
 * 3. If authenticated but wrong role -\> redirect to unauthorized page
 * 4. If authenticated and correct role -\> render the route
 */
export default function ProtectedRoute({ allowedRoles, redirectTo = path.login }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <Loading />;
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  // At this point, user is guaranteed to be non-null due to the above check
  const currentUser = user;

  // Check role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.includes(currentUser.role);

    if (!hasRequiredRole) {
      // User doesn't have required role - redirect based on their role
      const userHomePath = getUserHomePath(currentUser.role);
      return <Navigate to={userHomePath} replace />;
    }
  }

  // User is authenticated and has required role
  return <Outlet />;
}

/**
 * Get the home path for a user based on their role
 */
function getUserHomePath(role: UserRole): string {
  switch (role) {
    case "student":
      return path.mentee;
    case "tutor":
      return path.tutor;
    case "admin":
      return "/admin";
    default:
      return path.home;
  }
}
