import { motion } from "framer-motion";

export default function FileDropZone() {
  return (
    <motion.section className="flex flex-col justify-center items-center rounded-2xl w-full h-22 bg-[#1c1b1b] border-2 border-dashed drag-none">
      <h4 className="font-bold">Project Files</h4>
      <p>Drag & drop, or browse .zip or .rar</p>
    </motion.section>
  );
}
