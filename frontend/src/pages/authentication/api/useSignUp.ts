import { useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/axios";
import { type SignUpFormData } from "../validation/onboardingSchema";

export default function useSignUp() {
  return useMutation({
    mutationFn: async (signUpData: SignUpFormData) => {
      const response = await api.post("/auth/register", signUpData);
      return response.data;
    },
  });
}
