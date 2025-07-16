import { type DropzoneField } from "../../../types/dropzoneField";
import FilePreview from "./FilePreview";
import FilePlaceholder from "./createMode/FilePlaceholder";
import FileClearButton from "./FileClearButton";
import BaseDropzone from "../_shared/BaseDropzone";
import { type ProjectResponse } from "../../../types/projectResponse";
import { useProjectStore } from "../../../../projectEditor/services/useProjectStore";
import FileUpdatePlaceholder from "./editMode/FileUpdatePlaceholder";

type FileDropZoneProps = {
  field: DropzoneField;
};

export default function FileDropzone({ field }: FileDropZoneProps) {
  const { mode, project } = useProjectStore();

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

  return (
    <BaseDropzone
      field={field}
      isProjectUpload={false}
      onFileAbsent={() =>
        mode == "edit" && checkField(project, field) ? (
          <>
            <FileUpdatePlaceholder field={field} />
          </>
        ) : (
          <FilePlaceholder field={field} />
        )
      }
      onFilePresent={(file) => (
        <>
          <FilePreview
            fileName={file.name}
            fileSize={file.size}
            field={field}
          />
          <FileClearButton field={field} />
        </>
      )}
    />
  );
}
