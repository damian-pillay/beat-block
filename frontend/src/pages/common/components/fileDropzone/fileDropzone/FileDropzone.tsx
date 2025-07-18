import { type DropzoneField } from "../../../types/dropzoneField";
import FilePreview from "./FilePreview";
import FilePlaceholder from "./createMode/FilePlaceholder";
import FileClearButton from "./FileClearButton";
import BaseDropzone from "../_shared/BaseDropzone";
import { useProjectStore } from "../../../../projectEditor/services/useProjectStore";
import FileUpdatePlaceholder from "./editMode/FileUpdatePlaceholder";
import { checkFileUploaded } from "../../../helper/fileUploadedValidator";

type FileDropZoneProps = {
  field: DropzoneField;
};

export default function FileDropzone({ field }: FileDropZoneProps) {
  const { mode, projectResponse } = useProjectStore();
  const isFileAlreadyUploaded = checkFileUploaded(projectResponse, field);

  return (
    <BaseDropzone
      field={field}
      isProjectUpload={false}
      onFileAbsent={() =>
        mode == "edit" && isFileAlreadyUploaded ? (
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
