import { AnimatePresence, motion } from "framer-motion";
import useFileInput from "../../../hooks/useFileDrop";
import ProjectUploadPlaceholder from "./ProjectUploadPlaceholder";
import { Check } from "lucide-react";
import { useState } from "react";

export default function ProjectUploadDropzone() {
  const { file, handleFileInput } = useFileInput("compressedFile");
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDrop(event: React.DragEvent<HTMLElement>): void {
    event.preventDefault();
    setIsDragOver(false);

    const files = Array.from(event.dataTransfer.files);

    handleFileInput(files);
  }

  const dropzoneStyle: string = !file
    ? isDragOver
      ? "bg-[#2a2929] border"
      : "bg-[#1c1b1b] border-dashed"
    : "bg-[#004222] border-green-400";

  return (
    <motion.section
      onDrop={handleDrop}
      onDragOver={(e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragEnter={(e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => {
        setIsDragOver(false);
      }}
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
