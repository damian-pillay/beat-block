import { AnimatePresence, motion } from "framer-motion";
import { dropzoneConfig } from "../../../projectEditor/utils/dropzoneConfig";
import useFileDrop from "../../hooks/useFileDrop";
import { type DropzoneField } from "../../types/dropZoneField";
import FilePreview from "./filePreview";
import FilePlaceholder from "./filePlaceholder";
import FileClearButton from "./fileClearButton";

type FileDropZoneProps = {
  field: DropzoneField;
};

export default function FileDropzone({ field }: FileDropZoneProps) {
  const { dropHandlers, file, dropzoneStyle } = useFileDrop(field);

  return (
    <motion.section
      {...dropHandlers}
      className={`relative flex flex-col justify-center items-center rounded-2xl drag-none border-2 transition ${dropzoneStyle} ${dropzoneConfig[field].styleClass}`}
    >
      <AnimatePresence mode="wait">
        {file ? (
          <FilePreview file={file} title={dropzoneConfig[field].title} />
        ) : (
          <FilePlaceholder field={field} />
        )}
      </AnimatePresence>
      {file && <FileClearButton field={field} />}
    </motion.section>
  );
}
