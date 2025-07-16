import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProjectStore } from "../../../services/useProjectStore";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useEditorStore } from "../../../services/useEditorStore";
import { queryClient } from "../../../../../lib/queryClient";
import useProjectUpdate from "../../../hooks/useProjectUpdate";

export default function UpdateButton() {
  const {
    requestForm: projectRequest,
    resetRequestForm,
    projectResponse,
  } = useProjectStore();
  const { mutateAsync: updateProject } = useProjectUpdate();
  const { setPageIndex } = useEditorStore();
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
    setPageIndex(0);

    const updatePromise = updateProject({
      projectResponse,
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
      className="p-4 bg-[#ff0000] rounded-md min-w-30 h-13 cursor-pointer"
    >
      SAVE CHANGES
    </motion.button>
  );
}
