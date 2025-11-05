import { AnimatePresence, motion } from "framer-motion";
import { dropzoneConfig } from "../../../utils/dropzoneConfig";
import useFileHandler from "../../../hooks/useFileHandler";
import { type DropzoneField } from "../../../types/dropzoneField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDropzoneStyle from "../../../hooks/useDropzoneStyle";

type FileDropZoneProps = {
  field: DropzoneField;
  isProjectUpload?: boolean;
  onFilePresent: (file: File) => React.ReactNode;
  onFileAbsent: () => React.ReactNode;
};

export default function BaseDropzone({
  field,
  isProjectUpload = false,
  onFileAbsent,
  onFilePresent,
}: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { file, handleFileInput } = useFileHandler(field);
  const { getDropzoneStyle } = useDropzoneStyle(field);
  const navigate = useNavigate();

  useEffect(() => {
    if (isProjectUpload && file) {
      navigate("/create");
    }
  }, [file, isProjectUpload, navigate]);

  function handleDrop(event: React.DragEvent<HTMLElement>): void {
    event.preventDefault();
    setIsDragOver(false);

    const files = Array.from(event.dataTransfer.files);

    handleFileInput(files);
  }

  const dropzoneStyle = getDropzoneStyle(file, isDragOver);

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
        {file ? onFilePresent(file) : onFileAbsent()}
      </AnimatePresence>
    </motion.section>
  );
}
