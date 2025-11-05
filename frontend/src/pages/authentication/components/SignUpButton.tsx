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
  onValidationError: (errors: {
    [key in keyof SignUpFormData]?: string;
  }) => void;
}

export default function SignUpButton({
  formData,
  onValidationError,
}: SignUpButtonProps) {
  const { mutateAsync: signUp } = useSignUp();
  const navigate = useNavigate();

  async function validateSignUpInfo() {
    try {
      signUpSchema.validateSync(formData, { abortEarly: false });
      onValidationError({});
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        const fieldErrors: { [key in keyof SignUpFormData]?: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path as keyof SignUpFormData] = err.message;
          }
        });
        onValidationError(fieldErrors);
      } else {
        showErrorToast("An unexpected error occurred");
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
