import { Navigate, Outlet } from "react-router-dom";
import { APP_CONFIG } from "../lib/config";

const GuestGuard = () => {
  const tokenName = APP_CONFIG.TOKEN || "L&D_ADMIN";
  const isAuthenticated = localStorage.getItem(tokenName);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default GuestGuard;
