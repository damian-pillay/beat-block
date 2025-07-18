import FileBrowseButton from "../../_shared/FileBrowseButton";
import { motion } from "framer-motion";
import { GitCompareArrowsIcon } from "lucide-react";
import { dropzoneConfig } from "../../../../utils/dropzoneConfig";
import type { DropzoneField } from "../../../../types/dropzoneField";
import ToolTipProvider from "../../../toolTip/ToolTipProvider";

export default function ChangeFileButton({ field }: { field: DropzoneField }) {
  const config = dropzoneConfig[field];

  return (
    <ToolTipProvider text="Replace" delay={1000}>
      {({ onMouseEnter, onMouseLeave, renderToolTip }) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: 0 }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          transition={{ duration: 0.5 }}
          whileHover={{
            rotate: [-3, 3, -3, 3, -3],
            transition: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
          className={`absolute cursor-pointer ${config.clearButtonPosition} my-0 leading-none pt-1`}
        >
          <FileBrowseButton field={field}>
            <GitCompareArrowsIcon
              className="text-white leading-none block"
              size={26}
            />
          </FileBrowseButton>
          {renderToolTip()}
        </motion.div>
      )}
    </ToolTipProvider>
  );
}
