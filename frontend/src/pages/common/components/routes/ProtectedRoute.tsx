import { Navigate, Outlet } from "react-router-dom";
import useUserInfo from "../../../home/api/useUserInfo";

export default function ProtectedRoute() {
  const { isError, isLoading } = useUserInfo();

  if (isError || isLoading) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
