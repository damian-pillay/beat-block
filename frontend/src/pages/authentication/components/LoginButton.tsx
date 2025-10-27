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
  onValidationError: (errors: {
    [key in keyof LoginFormData]?: string;
  }) => void;
}

export default function LoginButton({
  formData,
  onValidationError,
}: LoginButtonProps) {
  const { mutateAsync: login } = useLogin();
  const navigate = useNavigate();

  async function validateSignUpInfo() {
    try {
      loginSchema.validateSync(formData, { abortEarly: false });
      onValidationError({}); // Clear any existing errors
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        const fieldErrors: { [key in keyof LoginFormData]?: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path as keyof LoginFormData] = err.message;
          }
        });
        onValidationError(fieldErrors);
      } else {
        showErrorToast("An unexpected error occurred whilst logging in");
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
          return `Sign up failed: ${
            error?.response?.data
              ? error.response.data
              : error.response
              ? error.response.status + " - " + error.response.statusText
              : "unknown error"
          }`;
        },
      },
    });
  }

  return (
    <AuthenticationButton onClick={handleClick}>LOGIN</AuthenticationButton>
  );
}
