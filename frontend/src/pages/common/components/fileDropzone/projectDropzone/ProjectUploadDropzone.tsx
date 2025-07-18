import BaseDropzone from "../_shared/BaseDropzone";
import ProjectUploadPlaceholder from "./ProjectUploadPlaceholder";
import { Check } from "lucide-react";

export default function ProjectUploadDropzone() {
  return (
    <BaseDropzone
      field={"compressedFile"}
      isProjectUpload={true}
      onFileAbsent={() => <ProjectUploadPlaceholder />}
      onFilePresent={() => <Check size={50} />}
    />
  );
}
