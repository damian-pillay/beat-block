import type { DropzoneField } from "../types/dropzoneField";
import { checkField } from "../helper/fileToFieldValidator";
import { useProjectStore } from "../../projectEditor/services/useProjectStore";
import { useCallback } from "react";

export default function useDropzoneStyle(field: DropzoneField) {
  const { mode, project } = useProjectStore();
  const hasFileField = checkField(project, field);

  const getDropzoneStyle = useCallback(
    (file: File | undefined, isDragOver: boolean) => {
      if (mode === "create") {
        if (!file && isDragOver) return "bg-[#2a2929] border";
        if (!file) return "bg-[#1c1b1b] border-dashed";
        return "bg-[#004222] border-green-400";
      }

      if (mode === "edit") {
        if (hasFileField && !file && isDragOver)
          return "bg-[#1e2a3a] border-blue-400";
        if (hasFileField && !file) return "bg-[#002244] border-blue-400";
        if (!hasFileField && !file) return "bg-[#1c1b1b] border-dashed";
        return "bg-[#004222] border-green-400";
      }

      return "bg-[#1c1b1b] border-dashed";
    },
    [mode, hasFileField]
  );

  return { getDropzoneStyle };
}
