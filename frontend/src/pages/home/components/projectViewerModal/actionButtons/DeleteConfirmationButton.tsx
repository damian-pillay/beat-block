import { motion, AnimatePresence } from "framer-motion";
import { Check, SeparatorVertical, X } from "lucide-react";
import { useState } from "react";

type buttonState = "keep" | "delete" | "neutral";

export default function DeleteConfirmationButton({
  onKeep,
  onDelete,
}: {
  onKeep: () => void;
  onDelete: () => void;
}) {
  const [buttonState, setButtonState] = useState<buttonState>("neutral");

  return (
    <motion.div
      key="deleting-overlay"
      initial={{ scale: 1, opacity: 0, y: -10 }}
      animate={{ scale: 1, opacity: 1, y: 10 }}
      exit={{ scale: 1, opacity: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="absolute left-1/2 h-30 w-70 bg-[#272626] justify-around bottom-[-4] -translate-x-1/2 p-2 flex flex-col items-center rounded-xl"
      style={{
        boxShadow: "0 -3px 16px rgba(0,0,0,0.3)",
      }}
    >
      <p>Are you sure?</p>
      <motion.div
        className="h-10 w-60 rounded-full flex flex-row justify-around items-center px-2 bg-[#171515]"
        initial={{ background: "#171515" }}
        animate={{
          background:
            buttonState === "keep"
              ? "#233F2D"
              : buttonState === "delete"
              ? "#5D2626"
              : "#171515",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <motion.button
          onHoverStart={() => setButtonState("keep")}
          onHoverEnd={() => setButtonState("neutral")}
          className="w-16 cursor-pointer "
          onClick={onKeep}
          animate={{
            color:
              buttonState === "delete" ? "rgba(255,255,255,0.2)" : undefined,
          }}
        >
          KEEP
        </motion.button>
        <motion.span className="w-8 h-full flex justify-center items-center relative">
          <AnimatePresence mode="wait">
            {buttonState === "neutral" && (
              <motion.div
                key="neutral"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <SeparatorVertical />
              </motion.div>
            )}
            {buttonState === "keep" && (
              <motion.div
                key="keep"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <Check />
              </motion.div>
            )}
            {buttonState === "delete" && (
              <motion.div
                key="delete"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <X />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.span>
        <motion.button
          animate={{
            color: buttonState === "keep" ? "rgba(255,255,255,0.2)" : undefined,
          }}
          onHoverStart={() => setButtonState("delete")}
          onHoverEnd={() => setButtonState("neutral")}
          className="w-16 cursor-pointer "
          onClick={onDelete}
        >
          DELETE
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
