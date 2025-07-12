import { motion } from "framer-motion";

interface AddButtonProps {
  isOpen: boolean;
  handleToggle: () => void;
}

export default function AddButton({ isOpen, handleToggle }: AddButtonProps) {
  return (
    <motion.button
      onClick={handleToggle}
      animate={{ backgroundColor: isOpen ? "#272626" : "#ff0000" }}
      className="cursor-pointer stroke-white rounded-full h-full aspect-square flex z-50 items-center justify-center"
    >
      <motion.div
        className="flex justify-center items-center w-[80%] h-[80%]"
        animate={{ rotate: 0 }}
        whileHover={
          isOpen
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
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "circInOut" }}
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="12" y1="5" x2="12" y2="19" />
        </motion.svg>
      </motion.div>
    </motion.button>
  );
}
