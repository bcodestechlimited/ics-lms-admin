import {Navigate, Outlet} from "react-router-dom";
import {toast} from "sonner";
import {PageLoader} from "../components/loader";
import {useValidateUser} from "../hooks/auth-hook";
import {APP_CONFIG} from "../lib/config";

const token = APP_CONFIG.TOKEN || "L&D_ADMIN";

const AuthGuard = () => {
  const {data, isLoading, isError} = useValidateUser();

  const user = data;

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !user) {
    toast.error("Please login", {
      id: "unique",
    });
    localStorage.removeItem(token);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
