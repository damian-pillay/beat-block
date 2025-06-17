import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function EditorProgressTitle() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
    >
      <h3 className="font-medium text-lg drag-none flex border gap-3">
        <span>Files & Basic Information</span>
        <span>
          <ChevronRight />
        </span>
        <span>Metadata</span>
        <span>
          <ChevronRight />
        </span>
        <span>Publish</span>
      </h3>
    </motion.section>
  );
}
