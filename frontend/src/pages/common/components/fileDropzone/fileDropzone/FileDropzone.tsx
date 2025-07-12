import { AnimatePresence, motion } from "framer-motion";
import { dropzoneConfig } from "../../../utils/dropzoneConfig";
import useFileDrop from "../../../hooks/useFileDrop";
import { type DropzoneField } from "../../../types/dropzoneField";
import FilePreview from "./FilePreview";
import FilePlaceholder from "./FilePlaceholder";
import FileClearButton from "./FileClearButton";

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
          <>
            <FilePreview file={file} title={dropzoneConfig[field].title} />
            <FileClearButton field={field} />
          </>
        ) : (
          <FilePlaceholder field={field} />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
