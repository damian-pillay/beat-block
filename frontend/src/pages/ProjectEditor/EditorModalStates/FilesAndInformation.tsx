import { motion } from "framer-motion";
import FileUploadSection from "../FileUploadSection";
import BasicDataSection from "../BasicDataSection";

export default function FilesAndInformation() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
        className="flex flex-col gap-4 items-center w-full h-full drag-none"
      >
        <FileUploadSection />
        <hr className="w-full h-[4px] flex-shrink-0 bg-white opacity-10 rounded-sm" />
        <BasicDataSection />
      </motion.section>
    </>
  );
}
