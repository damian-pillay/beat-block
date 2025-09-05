import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SendHorizonal } from "lucide-react";

interface AuthenticationButtonProps {
  children: string;
  onClick: () => void;
}

export default function AuthenticationButton({
  children,
  onClick,
}: AuthenticationButtonProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <motion.button
      type="button"
      onMouseOver={() => setIsDragOver(true)}
      onMouseLeave={() => setIsDragOver(false)}
      transition={{ duration: 0.01 }}
      onClick={onClick}
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
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
