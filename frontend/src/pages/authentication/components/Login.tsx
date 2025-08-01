import OnboardingFormInput from "./OnboardingFormInput";
import { LoginConfig } from "../utils/OnboardingConfig";
import SignUpButton from "./SignUpButton";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex items-center justify-center p-23 px-12"
    >
      <form className=" relative h-80 w-full rounded-3xl flex flex-col justify-between overflow-hidden gap-2 p-6 px-14 items-center">
        <div className="absolute inset-0 h-full w-full bg-white opacity-10" />
        <h2 className="text-2xl text-white font-bold">LOGIN</h2>
        <div className="w-full flex flex-col gap-4">
          {LoginConfig.map((input, index) => (
            <OnboardingFormInput
              key={index}
              title={input.title}
              type={input.type}
              placeholder={input.placeholder}
            />
          ))}
        </div>
        <SignUpButton />
      </form>
    </motion.div>
  );
}
