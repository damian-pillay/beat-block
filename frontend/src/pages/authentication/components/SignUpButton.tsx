import { ValidationError } from "yup";
import { showErrorToast } from "../../common/utils/toastConfig";
import {
  type SignUpFormData,
  signUpSchema,
} from "../validation/onboardingSchema";
import AuthenticationButton from "./AuthenticationButton2";
import useSignUp from "../api/useSignUp";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface SignUpButtonProps {
  formData: SignUpFormData;
}

export default function SignUpButton({ formData }: SignUpButtonProps) {
  const { mutateAsync: signUp } = useSignUp();
  const navigate = useNavigate();

  async function validateSignUpInfo() {
    try {
      signUpSchema.validateSync(formData);
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        showErrorToast(error.message);
      } else {
        showErrorToast("An unexpected error occured");
      }
      return false;
    }
  }

  async function handleClick() {
    const isValid = await validateSignUpInfo();
    if (!isValid) return;

    const signUpPromise = signUp(formData).then(() => {
      navigate("/login");
    });

    toast.promise(signUpPromise, {
      pending: "Signing up...",
      success: "Sign up successful! Please login",
      error: {
        render({ data }: { data: AxiosError }) {
          return `Sign up failed: ${data?.message || "Unknown error"}`;
        },
      },
    });
  }

  return (
    <AuthenticationButton onClick={handleClick}>SIGN UP</AuthenticationButton>
  );
}
