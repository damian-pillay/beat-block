import { motion } from "framer-motion";
import { dropzoneConfig } from "../../../projectEditor/utils/dropzoneConfig";
import { type DropzoneField } from "../../types/dropZoneField";
import { formatList } from "../../../projectEditor/helpers/formatters";
import FileBrowseButton from "./fileBrowseButton";

interface FilePlaceholderProps {
  field: DropzoneField;
}

export default function FilePlaceholder({ field }: FilePlaceholderProps) {
  const image = "imageFile";
  const config = dropzoneConfig[field];

  return (
    <>
      <motion.h4
        key="placeholder-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center font-bold"
      >
        {config.title}
      </motion.h4>
      <p className="whitespace-pre-line text-center">
        Drag & drop, or <FileBrowseButton field={field} />{" "}
        {field === image && <br />}
        {formatList(config.extensions)}
      </p>
      {config.description && (
        <p className="opacity-30">{dropzoneConfig[field].description}</p>
      )}
    </>
  );
}
