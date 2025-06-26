import { motion } from "framer-motion";
import FileUploadSection from "./FileUploadSection";
import BasicDataSection from "./BasicDataSection";

export default function FilesAndInformation() {
  return (
    <>
      <motion.section className="flex flex-col gap-4 items-center w-full h-full drag-none border">
        <FileUploadSection />
        <hr className="w-full h-[4px] flex-shrink-0 bg-white opacity-10 rounded-sm" />
        <BasicDataSection />
      </motion.section>
    </>
  );
}
