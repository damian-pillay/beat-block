import * as yup from "yup";

import { type InferType } from "yup";
export type SignUpFormData = InferType<typeof signUpSchema>;
export type LoginFormData = InferType<typeof loginSchema>;

const passwordSchema = yup
  .string()
  .required("Password is required")
  .test(
    "is-strong",
    "Password must include the following:\n• At least 8 characters\n• One lowercase letter\n• One uppercase letter\n• One number\n• One special character",
    (value) => {
      if (!value) return false;
      return (
        value.length >= 8 &&
        /[a-z]/.test(value) &&
        /[A-Z]/.test(value) &&
        /\d/.test(value) &&
        /[^A-Za-z0-9]/.test(value)
      );
    }
  );

export const signUpSchema = yup.object({
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  password: passwordSchema,
  alias: yup.string().max(20, "Alias must be at most 20 characters long"),
  lastName: yup.string().required("Last name is required").max(20),
  firstName: yup.string().required("First name is required").max(20),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const loginSchema = yup.object({
  password: yup.string().required("Password is required"),
  email: yup
    .string()
    .email("Invalid format - must be in the form example@email.com")
    .required("Email is required"),
});
