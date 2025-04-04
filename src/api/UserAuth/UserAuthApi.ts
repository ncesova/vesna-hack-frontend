import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import UserAuthService, { type UserRequestDTO } from "./UserAuthService";

export const userAuthOptions = () => {
  return queryOptions({
    queryKey: ["userAuth"],
    queryFn: () => UserAuthService.getUser(),
  });
};

export const useUpdateUserAuth = () => {
  const queryClient = useQueryClient();

  const registerUserMutation = useMutation({
    mutationFn: (data: UserRequestDTO) => UserAuthService.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAuth"] });
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: (data: Omit<UserRequestDTO, "name">) => UserAuthService.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAuth"] });
    },
  });

  const logoutUserMutation = useMutation({
    mutationFn: () => UserAuthService.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAuth"] });
    },
  });

  return {
    registerUserMutation,
    loginUserMutation,
    logoutUserMutation,
  };
};