import { motion } from "framer-motion";
import EditorProgressTitle from "./EditorProgressTitle";
import EditorContent from "./EditorContent";

export default function EditorModal() {
  return (
    <div className="h-full flex justify-center py-8">
      <motion.form
        onSubmit={(e) => e.preventDefault()}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.8, type: "spring" },
        }}
        exit={{
          scale: 0,
          opacity: 0,
          transition: { duration: 0.3, type: "tween" },
        }}
        className="md:w-4xl md:max-w-[80%] w-[95%] md:h-[640px] h-[550px] flex flex-col gap-4 p-8 rounded-4xl bg-[#272626] shadow-lg"
      >
        <EditorProgressTitle />
        <hr className="w-full h-[4px] bg-white opacity-10 rounded-sm" />
        <EditorContent />
      </motion.form>
    </div>
  );
}
