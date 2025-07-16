import { useProjectStore } from "../../projectEditor/services/useProjectStore";
import { dropzoneConfig } from "../utils/dropzoneConfig";
import { showInfoToast } from "../utils/toastConfig";
import { showErrorToast } from "../utils/toastConfig";
import { type DropzoneField } from "../types/dropzoneField";

export default function useFileHandler(field: DropzoneField) {
  const { updateRequestForm: updateProject, requestForm } = useProjectStore();
  const file = requestForm[field];

  function handleFileInput(files: File[]) {
    if (!files) {
      return;
    }

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

  return {
    handleFileInput,
    file,
  };
}
