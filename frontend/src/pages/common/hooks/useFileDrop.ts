import { useState } from "react";
import { useProjectStore } from "../../projectEditor/services/useProjectStore";
import { dropzoneConfig } from "../../projectEditor/utils/dropzoneConfig";
import { showInfoToast } from "../utils/toastConfig";
import { showErrorToast } from "../utils/toastConfig";

type FileDropZoneProps = {
  field: "compressedFile" | "audioFile" | "imageFile";
};

export default function useFileDrop(field: FileDropZoneProps["field"]) {
  const { updateProject, project } = useProjectStore();
  const [isDragOver, setIsDragOver] = useState(false);

  const file = project[field];

  function handleDrop(event: React.DragEvent<HTMLElement>): void {
    event.preventDefault();
    setIsDragOver(false);

    const files = Array.from(event.dataTransfer.files);

    if (files.length !== 1) {
      showErrorToast("Please only drop one file.");
      return;
    }

    if (!dropzoneConfig[field].mimeTypes.includes(files[0].type)) {
      showInfoToast(files[0].type);
      showErrorToast("Please drop a valid file type");
      return;
    }

    updateProject({ [field]: files[0] });
  }

  const dropHandlers = {
    onDrop: handleDrop,
    onDragOver: (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      setIsDragOver(true);
    },
    onDragEnter: (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      setIsDragOver(true);
    },
    onDragLeave: () => {
      setIsDragOver(false);
    },
  };

  const dropzoneStyle: string = !file
    ? isDragOver
      ? "bg-[#2a2929] border"
      : "bg-[#1c1b1b] border-dashed"
    : "bg-[#004222] border-green-400";

  const onDragOverStyle = isDragOver ? "bg-[#2a2929] border" : "";

  return { dropHandlers, file, dropzoneStyle, onDragOverStyle };
}
