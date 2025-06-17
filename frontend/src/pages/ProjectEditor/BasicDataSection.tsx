import { motion } from "framer-motion";
import TextInput from "./TextInput";

export default function BasicDataSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
      className="flex gap-6 w-full h-full drag-none"
    >
      <motion.section
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
        className="flex flex-col borders gap-10 justify-center items-center rounded-2xl aspect-square h-full bg-[#1c1b1b] border-2 border-dashed drag-none"
      ></motion.section>
      <motion.section
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
        className="flex flex-col border border-amber-600 w-full justify-between"
      >
        <TextInput
          title="title"
          placeholder="Give your track a name."
          charLimit={50}
        />
        <TextInput
          title="description"
          placeholder="Share the story, vibe or inspiration behind your track."
          charLimit={100}
        />
      </motion.section>
    </motion.section>
  );
}
