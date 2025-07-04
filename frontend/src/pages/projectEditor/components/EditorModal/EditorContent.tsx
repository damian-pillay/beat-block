import FilesAndInformation from "../EditorModalStates/FilesAndInformation/FilesAndInformation";
import { useEditorStore } from "../../services/useEditorStore";
import Metadata from "../EditorModalStates/MetaData/Metadata";
import { AnimatePresence } from "framer-motion";
import Preview from "../EditorModalStates/Preview/Preview";
import { motion } from "framer-motion";

export default function EditorContent() {
  const { pageIndex } = useEditorStore();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.2, ease: "easeIn" }}
        className="flex flex-col gap-4 h-full w-full"
      >
        <div className="h-full w-full">
          <AnimatePresence mode="wait">
            {pageIndex === 0 && (
              <motion.div
                key="files-and-information"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex flex-col justify-between gap-4 items-center h-full w-full drag-none"
              >
                <FilesAndInformation />
              </motion.div>
            )}
            {pageIndex === 1 && (
              <motion.div
                key="meta-data"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex flex-col justify-between gap-4 items-center h-full w-full drag-none"
              >
                <Metadata />
              </motion.div>
            )}
            {pageIndex === 2 && (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex flex-col justify-between gap-4 items-center h-full w-full drag-none"
              >
                <Preview />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
