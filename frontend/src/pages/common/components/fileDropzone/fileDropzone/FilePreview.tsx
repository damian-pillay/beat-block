import { motion } from "framer-motion";
import { formatFileSize } from "../../../../projectEditor/helpers/formatters";

interface FilePreviewProps {
  title: string;
  fileName: string;
  fileSize: number;
}

export default function FilePreview({
  title,
  fileName,
  fileSize,
}: FilePreviewProps) {
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
        <span className="truncate">{fileName}</span>
        {"  •  "}
        <span>{formatFileSize(fileSize)}</span>
      </motion.p>
    </>
  );
}
