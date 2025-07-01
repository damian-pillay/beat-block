import { motion } from "framer-motion";
import { useEditorStore } from "../../../stores/useEditorStore";

interface EditorButtonProps {
  text: string;
}

export default function EditorButton({ text }: EditorButtonProps) {
  const { nextPage } = useEditorStore();

  return (
    <motion.button
      type="button"
      onClick={nextPage}
      className="p-4 bg-[#ff0000] rounded-md min-w-30 h-13 cursor-pointer"
    >
      {text.toUpperCase()}
    </motion.button>
  );
}
