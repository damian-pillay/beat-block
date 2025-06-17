import { motion } from "framer-motion";

interface EditorButtonProps {
  text: string;
}

export default function EditorButton({ text }: EditorButtonProps) {
  return (
    <motion.button className="p-4 bg-[#ff0000] rounded-md min-w-30 ml-auto h-13">
      {text.toUpperCase()}
    </motion.button>
  );
}
