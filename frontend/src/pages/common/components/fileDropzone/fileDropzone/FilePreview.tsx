import { motion } from "framer-motion";
import { formatFileSize } from "../../../../projectEditor/helpers/formatters";

interface FilePreviewProps {
  title: string;
  file: File;
}

export default function FilePreview({ title, file }: FilePreviewProps) {
  return (
    <>
      <motion.h4
        key="file-name"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex font-bold w-full px-5"
      >
        {title}
      </motion.h4>
      <motion.p
        key="file-size"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex w-full px-5 whitespace-pre"
      >
        <span className="truncate">{file.name}</span>
        {"  •  "}
        <span>{formatFileSize(file.size)}</span>
      </motion.p>
    </>
  );
}
