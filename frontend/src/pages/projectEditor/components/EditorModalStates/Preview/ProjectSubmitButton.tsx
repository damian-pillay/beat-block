import { motion } from "framer-motion";
import { useEditorStore } from "../../../services/useEditorStore";
import PublishButton from "./PublishButton";
import { useProjectStore } from "../../../services/useProjectStore";
import UpdateButton from "./UpdateButton";

export default function ProjectSubmitButton() {
  const { setPageIndex } = useEditorStore();
  const { mode } = useProjectStore();
  const isEditMode = mode == "edit";

  return (
    <motion.section
      key={"publishProject"}
      className={`flex flex-col w-full justify-center items-center gap-4`}
    >
      {isEditMode ? <UpdateButton /> : <PublishButton />}
      <p>
        <span className="opacity-40">Not happy ? </span>
        <motion.button
          onClick={() => setPageIndex(0)}
          style={{ color: "#60a5fa" }}
          whileHover={{
            color: "#93c5fd",
            transition: {
              duration: 0.1,
              ease: "easeInOut",
            },
          }}
          whileTap={{
            color: "#848484",
            transition: { duration: 0.05, ease: "backOut" },
          }}
          className="rounded-sm select-none cursor-pointer"
        >
          edit information
        </motion.button>
      </p>
    </motion.section>
  );
}
