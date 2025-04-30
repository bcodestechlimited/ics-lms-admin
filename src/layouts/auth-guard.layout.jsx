import {Navigate, Outlet} from "react-router-dom";
import {toast} from "sonner";
import {PageLoader} from "../components/loader";
import {useValidateUser} from "../hooks/auth-hook";

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
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
