import { motion } from "framer-motion";
import { dropzoneConfig } from "../../../../utils/dropzoneConfig";
import { type DropzoneField } from "../../../../types/dropzoneField";
import ChangeFileButton from "./ChangeFileButton";

interface FileUpdatePlaceholderProps {
  field: DropzoneField;
}

export default function FileUpdatePlaceholder({
  field,
}: FileUpdatePlaceholderProps) {
  const config = dropzoneConfig[field];

  return (
    <>
      <motion.h4
        key="placeholder-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex font-bold w-full px-5"
      >
        {config.title}
      </motion.h4>
      <p className="whitespace-pre-line w-full px-5">
        A File has already been uploaded.
      </p>
      {config.description && <p className="opacity-30">{config.description}</p>}
      <ChangeFileButton field={field} />
    </>
  );
}
