import { AnimatePresence, motion } from "framer-motion";
import useToolTip from "../../../../common/hooks/useToolTip";
import Tooltip from "../../../../common/components/projectBlock/ToolTip";

interface ProjectActionButtonProps {
  icon: string;
  alt: string;
  onClick?: () => void;
}

export default function ProjectActionButton({
  icon,
  alt,
  onClick,
}: ProjectActionButtonProps) {
  const { handleMouseEnter, handleMouseLeave, showTooltip } = useToolTip(800);

  return (
    <>
      <AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClick}
          className="drag-none rounded-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={icon}
            alt={alt}
            className="object-contain h-18 cursor-pointer drag-none"
          />

          <AnimatePresence>
            {showTooltip && <Tooltip text={alt} />}
          </AnimatePresence>
        </motion.button>
      </AnimatePresence>
    </>
  );
}
