import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SendHorizonal } from "lucide-react";

export default function SignUpButton() {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <motion.button
      type="button"
      onMouseOver={() => setIsDragOver(true)}
      onMouseLeave={() => setIsDragOver(false)}
      transition={{ duration: 0.01 }}
      className="flex justify-center items-center p-4 bg-[#ff0000] min-w-30 h-10 rounded-full cursor-pointer overflow-hidden relative transition focus:bg-[#cc0000]"
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
            SIGN UP
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
