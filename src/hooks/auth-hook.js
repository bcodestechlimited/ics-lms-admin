import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import useAuthStore from "../data/stores/authstore";
import {APP_CONFIG} from "../lib/config";
import {authService} from "../services/auth.service";

const token = APP_CONFIG.TOKEN || "L&D_ADMIN";

export const useLogin = () => {
  const {setUser} = useAuthStore();

  return useMutation({
    mutationFn: (payload) => authService.login(payload),
    onSuccess: (res) => {
      const accessToken = res.responseObject.token;
      if (!accessToken) {
        toast.error("Invalid credentials");
        return;
      }
      setUser(res.responseObject.user);
      localStorage.setItem(token, res.responseObject.token);
    },
  });
};

export const useValidateUser = () => {
  return useQuery({
    queryKey: ["validate-user"],
    queryFn: () => authService.validateUser(),
  });
};

export const useSendPasswordResetLink = () => {
  return useMutation({
    mutationFn: (payload) => authService.sendPasswordResetLink(payload),
  });
};

export const useResetUserPassword = () => {
  return useMutation({
    mutationFn: (payload) => authService.resetPasswordService(payload),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  // const {clearSession} = useAuthStore();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // clearSession();
      queryClient.invalidateQueries({queryKey: ["validate-user"]});
    },
  });
};


