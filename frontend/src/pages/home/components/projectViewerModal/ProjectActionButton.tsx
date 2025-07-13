import { AnimatePresence, motion } from "framer-motion";

interface ProjectActionButtonProps {
  icon: string;
}

export default function ProjectActionButton({
  icon,
}: ProjectActionButtonProps) {
  return (
    <AnimatePresence>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <img src={icon} className="object-contain h-18 cursor-pointer" />
      </motion.button>
    </AnimatePresence>
  );
}
