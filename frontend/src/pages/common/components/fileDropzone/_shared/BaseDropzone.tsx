import { AnimatePresence, motion } from "framer-motion";
import { dropzoneConfig } from "../../../utils/dropzoneConfig";
import useFileHandler from "../../../hooks/useFileHandler";
import { type DropzoneField } from "../../../types/dropzoneField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../../../../projectEditor/services/useProjectStore";
import { type ProjectResponse } from "../../../types/projectResponse";

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
  const { mode, project } = useProjectStore();
  const navigate = useNavigate();

  const fileMap = {
    compressedFile: "hasFile",
    audioFile: "hasAudio",
    imageFile: "hasImage",
  } as const;

  type FileField = keyof typeof fileMap;

  function checkField(project?: Partial<ProjectResponse>, field?: FileField) {
    if (!project || !field) return false;

    const fileFlag = fileMap[field];
    const hasFieldFile = project[fileFlag as keyof ProjectResponse];

    return hasFieldFile;
  }

  function handleDrop(event: React.DragEvent<HTMLElement>): void {
    event.preventDefault();
    setIsDragOver(false);

    const files = Array.from(event.dataTransfer.files);

    handleFileInput(files);

    if (isProjectUpload) {
      navigate("/create");
    }
  }

  let dropzoneStyle: string = "bg-[#1c1b1b] border-dashed";

  if (mode == "create") {
    switch (true) {
      case !file && isDragOver:
        dropzoneStyle = "bg-[#2a2929] border";
        break;
      case !file && !isDragOver:
        dropzoneStyle = "bg-[#1c1b1b] border-dashed";
        break;
      case !!file:
        dropzoneStyle = "bg-[#004222] border-green-400";
        break;
    }
  } else if (mode == "edit") {
    switch (true) {
      case checkField(project, field) && !file && isDragOver:
        dropzoneStyle = "bg-[#1e2a3a] border-blue-400";
        break;
      case checkField(project, field) && !file:
        dropzoneStyle = "bg-[#002244] border-blue-400";
        break;
      case !checkField(project, field) && !file:
        dropzoneStyle = "bg-[#1c1b1b] border-dashed";
        break;
      case !!file:
        dropzoneStyle = "bg-[#004222] border-green-400";
        break;
    }
  }

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
