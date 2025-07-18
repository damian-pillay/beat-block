import type { DropzoneField } from "../types/dropzoneField";
import { checkFileUploaded } from "../helper/fileUploadedValidator";
import { useProjectStore } from "../../projectEditor/services/useProjectStore";
import { useCallback } from "react";

export default function useDropzoneStyle(field: DropzoneField) {
  const { mode, projectResponse: project } = useProjectStore();
  const isFileAlreadyUploaded = checkFileUploaded(project, field);

  const getDropzoneStyle = useCallback(
    (file: File | undefined, isDragOver: boolean) => {
      if (mode === "create") {
        if (!file && isDragOver) return "bg-[#2a2929] border";
        if (!file) return "bg-[#1c1b1b] border-dashed";
        return "bg-[#004222] border-green-400";
      }

      if (mode === "edit") {
        if (isFileAlreadyUploaded && !file && isDragOver)
          return "bg-[#1e2a3a] border-blue-400";
        if (isFileAlreadyUploaded && !file)
          return "bg-[#002244] border-blue-400";
        if (!isFileAlreadyUploaded && !file)
          return "bg-[#1c1b1b] border-dashed";
        return "bg-[#004222] border-green-400";
      }

      return "bg-[#1c1b1b] border-dashed";
    },
    [mode, isFileAlreadyUploaded]
  );

  return { getDropzoneStyle };
}
