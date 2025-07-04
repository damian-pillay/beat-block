import { motion } from "framer-motion";
import { useEditorStore } from "../../services/useEditorStore";

export default function EditorButton() {
  const { nextPage } = useEditorStore();

  return (
    <motion.button
      type="button"
      onClick={nextPage}
      className="p-4 bg-[#ff0000] rounded-md min-w-30 h-13 cursor-pointer"
    >
      NEXT
    </motion.button>
  );
}
