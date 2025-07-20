import { motion, AnimatePresence } from "framer-motion";
import useFetchFile from "../../hooks/useFetchFile";
import { Ban, Download } from "lucide-react";
import { useState } from "react";

import {
  showErrorToast,
  showWarningToast,
} from "../../../common/utils/toastConfig";

interface ProjectDownloadButtonProps {
  title?: string;
  type: string;
  hasFile: boolean;
  id?: number;
}

export default function ProjectDownloadButton({
  title,
  type,
  hasFile,
  id = -1,
}: ProjectDownloadButtonProps) {
  const [isHover, setIsHover] = useState(false);
  const { refetch } = useFetchFile({
    field: type,
    projectId: id,
    isEnabled: false,
  });

  async function handleDownload() {
    const { data: blob, error } = await refetch();

    if (error) {
      showErrorToast(`File not found: ${error.message}`);
      return;
    }

    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      if (title) {
        link.download = title;
      }

      document.body.appendChild(link);
      link.click();

      link.remove();
      URL.revokeObjectURL(link.href);
      return;
    }
  }

  return (
    <motion.button
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      onClick={
        hasFile
          ? handleDownload
          : () => showWarningToast(`There is no ${type} file available`)
      }
      className={`relative p-3 justify-center rounded-full bg-[#383737] text-white ${
        hasFile && "hover:bg-[#4c4b4b] cursor-pointer"
      }  transition focus:outline-none select-none  flex items-center gap-2 ${
        !hasFile && "opacity-50 cursor-not-allowed"
      }`}
    >
      <AnimatePresence>
        {isHover && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute left-6`}
          >
            {hasFile ? (
              <Download size={20} className="my-auto" />
            ) : (
              <Ban size={20} className="my-auto" />
            )}
          </motion.span>
        )}
      </AnimatePresence>
      <span>{type}</span>
    </motion.button>
  );
}
