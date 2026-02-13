import { AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface OnboardingFormInputProps {
  title: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  isRequired: boolean;
}

export default function OnboardingFormInput({
  title,
  type,
  placeholder,
  value = "",
  onChange = () => {},
  error,
  isRequired,
}: OnboardingFormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const iconVariants = {
    initial: { opacity: 0, scale: 0.8, y: 4 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -4 },
  };

  return (
    <section className="w-full flex flex-col gap-1">
      <label className="block text-sm text-white px-4 font-bold">
        {title.toUpperCase()}{" "}
        {isRequired ? <span className="text-red-500">*</span> : undefined}
      </label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={`w-full p-2 bg-white/20 text-white placeholder-white/60 rounded-full px-4 pr-12 h-10 focus:outline-none ${
            error ? "border border-red-500" : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {showPassword ? (
                <motion.div
                  key="eye-open"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.12 }}
                >
                  <EyeOff size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="eye-closed"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.12 }}
                >
                  <Eye size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
      {error && (
        <span className="text-red-500 text-sm px-4 mt-1 whitespace-pre-line">
          {error}
        </span>
      )}
    </section>
  );
}
