import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProjectStore } from "../../../services/useProjectStore";

export default function PublishButton() {
  const { resetProject } = useProjectStore();
  const navigate = useNavigate();

  function handleClick() {
    resetProject();
    navigate("/");
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="p-4 bg-[#ff0000] rounded-md min-w-30 h-13 cursor-pointer"
    >
      PUBLISH
    </motion.button>
  );
}
