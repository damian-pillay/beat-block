import { motion, AnimatePresence } from "framer-motion";
import EditorProgressTitle from "./EditorProgressTitle";
import FileUploadSection from "./FileUploadSection";
import BasicDataSection from "./BasicDataSection";
import EditorButton from "../../components/common/Buttons/EditorButton";

export default function EditorModal() {
  return (
    <div className="h-full flex justify-center py-8">
      <AnimatePresence>
        <motion.form
          key="modal"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, type: "spring", delay: 0.02 }}
          className="md:w-4xl md:max-w-[80%] w-[95%] md:h-[640px] h-[550px] flex flex-col gap-4 p-8 rounded-4xl overflow-hidden bg-[#272626] shadow-lg"
        >
          <EditorProgressTitle />
          <motion.section
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-4 items-center w-full h-full drag-none"
          >
            <hr className="w-full h-1 bg-white opacity-10 border-0 rounded-sm" />
            <FileUploadSection />
            <hr className="w-full h-1 bg-white opacity-10 border-0 rounded-sm" />
            <BasicDataSection />
            <EditorButton text="next" />
          </motion.section>
        </motion.form>
      </AnimatePresence>
    </div>
  );
}
