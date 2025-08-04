import { useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/axios";
import { type LoginFormData } from "../validation/onboardingSchema";

export default function useLogin() {
  return useMutation({
    mutationFn: async (loginData: LoginFormData) => {
      const response = await api.post("/auth/login", loginData);
      return response.data;
    },
  });
}
