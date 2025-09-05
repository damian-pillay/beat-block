import { Navigate, Outlet } from "react-router-dom";
import useUserInfo from "../../../home/api/useUserInfo";

interface ProtectedRouteProps {
  redirectIfAuthenticated?: boolean;
  redirectTo: string;
}

export default function ProtectedRoute({
  redirectTo,
  redirectIfAuthenticated = false,
}: ProtectedRouteProps) {
  const { data: userData, isLoading } = useUserInfo();

  if (isLoading) {
    return null;
  }

  const userAuthenticated = !!userData;

  const shouldRedirect = redirectIfAuthenticated
    ? userAuthenticated
    : !userAuthenticated;

  if (shouldRedirect) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
