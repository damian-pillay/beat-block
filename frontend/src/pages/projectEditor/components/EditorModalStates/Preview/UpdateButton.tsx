import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProjectStore } from "../../../services/useProjectStore";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useEditorStore } from "../../../services/useEditorStore";
import { queryClient } from "../../../../../lib/queryClient";
import useProjectUpdate from "../../../hooks/useProjectUpdate";
import { useState } from "react";
import { CloudCheck } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function UpdateButton() {
  const {
    requestForm: projectRequest,
    resetRequestForm,
    projectResponse,
  } = useProjectStore();
  const { mutateAsync: updateProject } = useProjectUpdate();
  const { setPageIndex } = useEditorStore();
  const [isDragOver, setIsDragOver] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
    setPageIndex(0);

    const updatePromise = updateProject({
      projectResponse: projectResponse!,
      projectRequest,
    }).then(() => {
      resetRequestForm();
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
    });

    toast.promise(updatePromise, {
      pending: `Updating '${projectRequest.name}'...`,
      success: `'${projectRequest.name}' has been successfully updated`,
      error: {
        render({ data }: { data: AxiosError }) {
          return `Failed to Update: ${data?.message || "Unknown error"}`;
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
      className="flex justify-center items-center p-4 bg-[#ff0000] rounded-md min-w-40 h-13 cursor-pointer overflow-hidden relative transition focus:bg-[#cc0000]"
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
            <CloudCheck size={28} />
          </motion.div>
        ) : (
          <motion.span
            key="text"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            SAVE CHANGES
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
