import { useProjectStore } from "../../../../projectEditor/services/useProjectStore";
import type { DropzoneField } from "../../../types/dropzoneField";
import { dropzoneConfig } from "../../../utils/dropzoneConfig";
import { motion } from "framer-motion";

interface DropzoneFieldProps {
  field: DropzoneField;
}

export default function FileClearButton({ field }: DropzoneFieldProps) {
  const { updateRequestForm: updateProject } = useProjectStore();
  const config = dropzoneConfig[field];

  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => updateProject({ [field]: undefined })}
        className={`absolute cursor-pointer ${config.clearButtonPosition}`}
        whileHover={{
          rotate: [-4, 4, -4, 4, -4],
          transition: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 0.8,
            ease: "easeInOut",
          },
        }}
      >
        {<config.clearButton />}
      </motion.button>
    </>
  );
}
