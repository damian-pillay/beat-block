import FilesAndInformation from "../EditorModalStates/FilesAndInformation/FilesAndInformation";
import EditorButton from "./EditorButton";
import { useEditorStore } from "../../../stores/useEditorStore";
import Metadata from "../EditorModalStates/MetaData/Metadata";
import { AnimatePresence, motion } from "framer-motion";

export default function EditorContent() {
  const { pageIndex } = useEditorStore();

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="h-full w-full">
        <AnimatePresence mode="wait">
          {pageIndex === 0 && (
            <motion.div
              key="files-and-information"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full w-full"
            >
              <FilesAndInformation />
            </motion.div>
          )}
          {pageIndex === 1 && (
            <motion.div
              key="metadata"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full w-full"
            >
              <Metadata />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <EditorButton text="next" />
    </div>
  );
}
