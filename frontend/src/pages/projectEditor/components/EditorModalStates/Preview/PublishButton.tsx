import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectStore } from "../../../services/useProjectStore";
import useProjectPublish from "../../../hooks/useProjectPublish";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useEditorStore } from "../../../services/useEditorStore";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CloudUploadIcon } from "lucide-react";

export default function PublishButton() {
  const { requestForm: project, resetRequestForm: resetProject } =
    useProjectStore();
  const { mutateAsync: publishProject } = useProjectPublish();
  const { setPageIndex } = useEditorStore();
  const [isDragOver, setIsDragOver] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleClick() {
    navigate("/");
    setPageIndex(0);

    const publishPromise = publishProject(project).then(() => {
      resetProject();
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
    });

    toast.promise(publishPromise, {
      pending: `Publishing '${project.name}'...`,
      success: `Congrats! '${project.name}' has been published`,
      error: {
        render({ data }: { data: AxiosError }) {
          return `Failed to publish: ${data?.message || "Unknown error"}`;
        },
      },
    });
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onMouseOver={() => setIsDragOver(true)}
      onMouseLeave={() => setIsDragOver(false)}
      transition={{ duration: 0.01 }}
      className="flex justify-center items-center p-4 bg-[#ff0000] rounded-md min-w-30 h-13 cursor-pointer overflow-hidden relative transition focus:bg-[#cc0000]"
    >
      <AnimatePresence mode="wait">
        {isDragOver ? (
          <motion.div
            key="send"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <CloudUploadIcon size={28} />
          </motion.div>
        ) : (
          <motion.span
            key="text"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            PUBLISH
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
