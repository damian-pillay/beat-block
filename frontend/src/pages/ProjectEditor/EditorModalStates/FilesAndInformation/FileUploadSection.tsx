import { motion } from "framer-motion";

export default function FileUploadSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-2 w-full h-full drag-none"
    >
      <h4 className="font-bold">FILES FOR UPLOAD</h4>
      <motion.section
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
        className="flex flex-col gap-4 justify-center items-center rounded-2xl w-full h-22 bg-[#1c1b1b] border-2 border-dashed drag-none"
      ></motion.section>
      <motion.section
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
        className="flex flex-col gap-4 justify-center items-center rounded-2xl w-full h-22 bg-[#1c1b1b] border-2 border-dashed drag-none"
      ></motion.section>
    </motion.section>
  );
}
