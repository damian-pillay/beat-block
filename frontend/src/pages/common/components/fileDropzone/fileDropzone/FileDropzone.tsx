import { AnimatePresence, motion } from "framer-motion";
import { dropzoneConfig } from "../../../utils/dropzoneConfig";
import useFileInput from "../../../hooks/useFileDrop";
import { type DropzoneField } from "../../../types/dropzoneField";
import FilePreview from "./FilePreview";
import FilePlaceholder from "./FilePlaceholder";
import FileClearButton from "./FileClearButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FileDropZoneProps = {
  field: DropzoneField;
  isProjectUpload?: boolean;
};

export default function FileDropzone({
  field,
  isProjectUpload = false,
}: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { file, handleFileInput } = useFileInput(field);
  const navigate = useNavigate();

  function handleDrop(event: React.DragEvent<HTMLElement>): void {
    event.preventDefault();
    setIsDragOver(false);

    const files = Array.from(event.dataTransfer.files);

    handleFileInput(files);

    if (isProjectUpload) {
      navigate("/");
    }
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
      className={`relative flex flex-col justify-center items-center rounded-2xl drag-none border-2 transition ${dropzoneStyle} ${
        !isProjectUpload ? dropzoneConfig[field].styleClass : "h-full"
      }`}
    >
      <AnimatePresence mode="wait">
        {file ? (
          <>
            <FilePreview
              fileName={file.name}
              fileSize={file.size}
              title={dropzoneConfig[field].title}
            />
            <FileClearButton field={field} />
          </>
        ) : (
          <FilePlaceholder field={field} />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
