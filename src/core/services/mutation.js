import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "src/core/config/api";
import { setCookie } from "src/core/utils/cookies";

const useSendOtp = () => {
  const mutationFn = (data) => api.post("/auth/send-otp", data);

  return useMutation({ mutationFn });
};

const useCheckOtp = () => {
  const queryClient = useQueryClient();

  const mutationFn = (data) => api.post("/auth/check-otp", data);

  const onSuccess = (data) => {
    setCookie("accessToken", data?.data?.accessToken, 30);
    setCookie("refreshToken", data?.data?.refreshToken, 365);
    queryClient.invalidateQueries({ queryKey: ["user-data"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

const useLogout = () => {
  const queryClient = useQueryClient();

  const mutationFn = async () => {
    setCookie("accessToken", "", -1);
    setCookie("refreshToken", "", -1);

    queryClient.setQueryData(["user-data"], null);
  };

  return useMutation({ mutationFn });
};

const useUpdateBankAccount = () => {
  const queryClient = useQueryClient();

  const mutationFn = (data) => api.put("/user/profile", data);

  const onSuccess = (data) => {
    queryClient.invalidateQueries({ queryKey: ["user-data"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

const useAddToBasket = () => {
  const mutationFn = (id) => api.put(`basket/${id}`);

  return useMutation({ mutationFn });
};

const useCheckout = () => {
  const queryClient = useQueryClient();

  const mutationFn = (data) => api.post("/order", data);

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["user-tours"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

export {
  useSendOtp,
  useCheckOtp,
  useLogout,
  useUpdateBankAccount,
  useAddToBasket,
  useCheckout,
};
