import { motion } from "framer-motion";
import { useState } from "react";

export default function AddButton() {
  const [openModal, setOpenModal] = useState(false);
  function handleToggle() {
    setOpenModal((prev) => !prev);
  }

  return (
    <motion.button
      onClick={handleToggle}
      className="cursor-pointer stroke-white rounded-full h-full aspect-square flex items-center justify-center bg-[#ff0000]"
    >
      <motion.div
        className="flex justify-center items-center w-[80%] h-[80%]"
        animate={{ rotate: 0 }}
        whileHover={
          openModal
            ? {
                rotate: [-4, 4, -4, 4, -4],
                transition: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 0.8,
                  ease: "easeInOut",
                },
              }
            : { scale: 1.1 }
        }
      >
        <motion.svg
          className="w-full h-full rounded-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          animate={{ rotate: openModal ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="12" y1="5" x2="12" y2="19" />
        </motion.svg>
      </motion.div>
    </motion.button>
  );
}
