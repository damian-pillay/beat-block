import * as yup from "yup";

import { type InferType } from "yup";
export type SignUpFormData = InferType<typeof signUpSchema>;
export type LoginFormData = InferType<typeof loginSchema>;

const passwordSchema = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .test(
    "has-lowercase",
    "Password must include at least one lowercase letter",
    (value) => /[a-z]/.test(value || "")
  )
  .test(
    "has-uppercase",
    "Password must include at least one uppercase letter",
    (value) => /[A-Z]/.test(value || "")
  )
  .test("has-number", "Password must include at least one number", (value) =>
    /\d/.test(value || "")
  )
  .test(
    "has-special",
    "Password must include at least one special character",
    (value) => /[^A-Za-z0-9]/.test(value || "")
  );

export const signUpSchema = yup.object({
  confirmPassword: yup
    .string()
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
    .email("Invalid email format")
    .required("Email is required"),
});
