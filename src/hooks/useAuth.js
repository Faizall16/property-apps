import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.user);
      queryClient.invalidateQueries(["profile"]);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.user);
      queryClient.invalidateQueries(["profile"]);
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: authService.getProfile,
    enabled: authService.isAuthenticated(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.clear();
    authService.logout();
  };
};
