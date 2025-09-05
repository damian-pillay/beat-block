import { ValidationError } from "yup";
import { showErrorToast } from "../../common/utils/toastConfig";
import {
  loginSchema,
  type LoginFormData,
} from "../validation/onboardingSchema";
import AuthenticationButton from "./AuthenticationButton2";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useLogin from "../api/useLogin";

interface LoginButtonProps {
  formData: LoginFormData;
}

export default function LoginButton({ formData }: LoginButtonProps) {
  const { mutateAsync: login } = useLogin();
  const navigate = useNavigate();

  async function validateSignUpInfo() {
    try {
      loginSchema.validateSync(formData);
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        showErrorToast(error.message);
      } else {
        showErrorToast("An unexpected error occured whilst logging in");
      }
      return false;
    }
  }

  async function handleClick() {
    const isValid = await validateSignUpInfo();
    if (!isValid) return;

    const loginPromise = login(formData).then(() => {
      navigate("/");
    });

    toast.promise(loginPromise, {
      pending: "Logging in...",
      error: {
        render({ data: error }: { data: AxiosError }) {
          return `Sign up failed: ${error?.response?.data || "Unknown error"}`;
        },
      },
    });
  }

  return (
    <AuthenticationButton onClick={handleClick}>LOGIN</AuthenticationButton>
  );
}
