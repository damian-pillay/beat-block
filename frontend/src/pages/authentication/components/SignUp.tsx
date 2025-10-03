import OnboardingFormInput from "./OnboardingFormInput";
import { SignUpConfig } from "../utils/OnboardingConfig";
import { motion } from "framer-motion";
import { type SignUpFormData } from "../validation/onboardingSchema";
import { useState } from "react";
import SignUpButton from "./SignUpButton";

type FormErrors = {
  [K in keyof SignUpFormData]?: string;
};

export default function SignUp() {
  const initialValues: SignUpFormData = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    alias: "",
  };
  const [formValues, setFormValues] = useState<SignUpFormData>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleInputChange(key: keyof SignUpFormData, value: string) {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: undefined,
      }));
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex items-center justify-center p-23 px-12"
    >
      <form className="relative h-160 w-full flex flex-col gap-2 p-6 items-center">
        <div className="absolute inset-0 h-full w-full bg-white opacity-10 -z-10 rounded-3xl " />
        <h2 className="text-2xl text-white font-bold">Sign Up</h2>
        <div className="w-full flex-1 flex flex-col gap-4 px-5 overflow-y-auto rounded-scrollbar relative">
          {SignUpConfig.map((input, index) => (
            <OnboardingFormInput
              key={index}
              title={input.title}
              type={input.type}
              placeholder={input.placeholder}
              value={formValues[input.key as keyof SignUpFormData]}
              onChange={(value) =>
                handleInputChange(input.key as keyof SignUpFormData, value)
              }
              error={errors[input.key as keyof SignUpFormData]}
              isRequired={input.isRequired}
            />
          ))}
        </div>
        <div className="flex justify-center w-full py-2">
          <SignUpButton formData={formValues} onValidationError={setErrors} />
        </div>
      </form>
    </motion.div>
  );
}
