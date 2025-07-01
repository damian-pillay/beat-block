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
      <AnimatePresence mode="wait">
        {pageIndex === 2 ? (
          <motion.div
            key={"next"}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`flex w-full justify-center items-center gap-4`}
          >
            <EditorButton text={"publish"} />
          </motion.div>
        ) : (
          <motion.div
            key={"publish"}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`flex w-full justify-end items-center gap-4`}
          >
            <EditorButton text={"next"} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
