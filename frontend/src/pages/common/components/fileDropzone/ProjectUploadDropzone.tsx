import { AnimatePresence, motion } from "framer-motion";
import useFileDrop from "../../hooks/useFileDrop";
import ProjectUploadPlaceholder from "./ProjectUploadPlaceholder";
import { Check } from "lucide-react";

export default function ProjectUploadDropzone() {
  const { dropHandlers, file, dropzoneStyle } = useFileDrop(
    "compressedFile",
    true
  );

  return (
    <motion.section
      {...dropHandlers}
      className={`relative flex flex-col justify-center items-center rounded-2xl drag-none border-2 transition ${dropzoneStyle} h-full`}
    >
      <AnimatePresence mode="wait">
        {file ? (
          <>
            <Check size={50} />
          </>
        ) : (
          <ProjectUploadPlaceholder />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
