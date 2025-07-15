import { dropzoneConfig } from "../../../utils/dropzoneConfig";
import { type DropzoneField } from "../../../types/dropzoneField";
import FilePreview from "./FilePreview";
import FilePlaceholder from "./FilePlaceholder";
import FileClearButton from "./FileClearButton";
import BaseDropzone from "../_shared/BaseDropzone";

type FileDropZoneProps = {
  field: DropzoneField;
};

export default function FileDropzone({ field }: FileDropZoneProps) {
  return (
    <BaseDropzone
      field={field}
      isProjectUpload={false}
      onFileAbsent={() => <FilePlaceholder field={field} />}
      onFilePresent={(file) => (
        <>
          <FilePreview
            fileName={file.name}
            fileSize={file.size}
            title={dropzoneConfig[field].title}
          />
          <FileClearButton field={field} />
        </>
      )}
    />
  );
}
