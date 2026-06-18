import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { PageLoader } from "../components/loader";
import { useValidateUser } from "../hooks/auth-hook";
import { APP_CONFIG } from "../lib/config";

const token = APP_CONFIG.TOKEN || "L&D_ADMIN";

const AuthGuard = () => {
  const tokenName = APP_CONFIG.TOKEN || "L&D_ADMIN";
  const hasToken = localStorage.getItem(tokenName);
  const { data: user, isLoading, isError } = useValidateUser();

  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !user) {
    toast.error("Session expired. Please login again.", { id: "auth-error" });
    localStorage.removeItem(tokenName);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
