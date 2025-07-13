import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";
import { useState } from "react";
import { api } from "../../../../lib/axios";
import { showErrorToast } from "../../../common/utils/toastConfig";
import { useQuery } from "@tanstack/react-query";

interface ProjectDownloadButtonProps {
  title?: string;
  type: string;
  id?: number;
}

export default function ProjectDownloadButton({
  title,
  type,
  id,
}: ProjectDownloadButtonProps) {
  const [isHover, setIsHover] = useState(false);
  const { refetch } = useQuery({
    queryKey: [type],
    queryFn: async () => {
      const response = await api.get(`/project/${id}/${type.toLowerCase()}`, {
        responseType: "blob",
      });

      return response.data;
    },
    enabled: false,
    retry: false,
  });

  async function handleDownload() {
    try {
      const { data, error } = await refetch();

      if (error) {
        showErrorToast(`File not found: ${error.message}`);
        return;
      }

      const link = document.createElement("a");
      link.href = URL.createObjectURL(data);

      if (title) {
        link.download = title;
      }

      document.body.appendChild(link);
      link.click();

      link.remove();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      showErrorToast(`File download failed: ${err}`);
    }
  }

  return (
    <motion.button
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      onClick={handleDownload}
      className="relative p-3 justify-center rounded-full bg-[#383737] text-white hover:bg-[#4c4b4b] transition focus:outline-none select-none cursor-pointer flex items-center gap-2"
    >
      <AnimatePresence>
        {isHover && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-6"
          >
            <Download size={20} className="my-auto" />
          </motion.span>
        )}
      </AnimatePresence>
      <span>{type}</span>
    </motion.button>
  );
}
