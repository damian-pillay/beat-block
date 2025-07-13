import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";
import { useState } from "react";

export default function ProjectDownloadButton({ title }: { title: string }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.button
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className="relative p-3 justify-center rounded-full bg-[#383737] text-white hover:bg-[#4c4b4b] transition focus:outline-none select-none cursor-pointer flex items-center gap-2"
    >
      <AnimatePresence>
        {isHover && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-6"
          >
            <Download size={20} className="my-auto" />
          </motion.span>
        )}
      </AnimatePresence>
      <span>{title}</span>
    </motion.button>
  );
}
