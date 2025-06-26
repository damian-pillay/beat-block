import { motion } from "framer-motion";
import TextInput from "./TextInput";

export default function BasicDataSection() {
  return (
    <motion.section className="flex gap-6 w-full h-full drag-none">
      <motion.section className="flex flex-col borders gap-10 justify-center items-center rounded-2xl aspect-square h-full bg-[#1c1b1b] border-2 border-dashed drag-none"></motion.section>
      <motion.section className="flex flex-col w-full justify-between">
        <TextInput
          title="title"
          placeholder="Give your track a name."
          charLimit={50}
          lineHeight={1}
        />
        <TextInput
          title="description"
          placeholder="Share the story, vibe or inspiration behind your track."
          charLimit={100}
          lineHeight={2}
        />
      </motion.section>
    </motion.section>
  );
}
