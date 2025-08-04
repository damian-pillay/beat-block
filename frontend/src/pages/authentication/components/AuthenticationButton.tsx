import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import {
  ValidationError,
  type AnyObject,
  type ObjectSchema,
  type Maybe,
} from "yup";
import { showErrorToast } from "../../common/utils/toastConfig";

interface AuthenticationButtonProps<T extends Maybe<AnyObject>> {
  validationSchema: ObjectSchema<T>;
  title: string;
  formData: T;
}

export default function AuthenticationButton<T extends Maybe<AnyObject>>({
  validationSchema,
  title,
  formData,
}: AuthenticationButtonProps<T>) {
  const [isDragOver, setIsDragOver] = useState(false);

  function handleClick() {
    try {
      validationSchema.validateSync(formData);
    } catch (error) {
      if (error instanceof ValidationError) {
        showErrorToast(error.message);
      } else {
        showErrorToast("An unexpected error occured");
      }
    }
  }

  return (
    <motion.button
      type="button"
      onMouseOver={() => setIsDragOver(true)}
      onMouseLeave={() => setIsDragOver(false)}
      transition={{ duration: 0.01 }}
      onClick={handleClick}
      className="flex justify-center items-center p-4 bg-[#ff0000] min-w-30 h-10 rounded-full cursor-pointer overflow-hidden relative transition"
    >
      <AnimatePresence mode="wait">
        {isDragOver ? (
          <motion.div
            key="send"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <SendHorizonal size={22} />
          </motion.div>
        ) : (
          <motion.span
            key="text"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
