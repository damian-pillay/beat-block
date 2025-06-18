import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEditorStore } from "../../store/useEditorStore";

export default function EditorProgressTitle() {
  const { pageIndex } = useEditorStore();

  const colors: {
    files: Record<number, string>;
    metadata: Record<number, string>;
    publish: Record<number, string>;
  } = {
    files: {
      0: "#ffffff",
      1: "#4ade80",
      2: "#4ade80",
    },
    metadata: {
      0: "#9ca3af",
      1: "#ffffff",
      2: "#4ade80",
    },
    publish: {
      0: "#9ca3af",
      1: "#9ca3af",
      2: "#ffffff",
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
    >
      <motion.h3
        transition={{ duration: 0.3 }}
        className="font-medium text-lg drag-none flex gap-3 items-center"
      >
        <motion.span
          animate={{ color: colors.files[pageIndex] }}
          transition={{ duration: 0.3 }}
        >
          Files & Basic Information
        </motion.span>

        <motion.span
          animate={{ color: colors.files[pageIndex] }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight />
        </motion.span>

        <motion.span
          animate={{ color: colors.metadata[pageIndex] }}
          transition={{ duration: 0.3 }}
        >
          Metadata
        </motion.span>

        <motion.span
          animate={{ color: colors.metadata[pageIndex] }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight />
        </motion.span>

        <motion.span
          animate={{ color: colors.publish[pageIndex] }}
          transition={{ duration: 0.3 }}
        >
          Publish
        </motion.span>
      </motion.h3>
    </motion.section>
  );
}
