import { AnimatePresence } from "framer-motion";
import useToolTip from "../../hooks/useToolTip";
import Tooltip from "./ToolTip";

export default function IconLabel({
  icon,
  text,
  alt,
}: {
  icon: string;
  text?: string;
  alt: string;
}) {
  const { handleMouseEnter, handleMouseLeave, showTooltip } = useToolTip();

  return (
    <li
      className="relative flex justify-start items-center gap-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>
        <img
          src={icon}
          alt={alt}
          className="object-cover md:h-8 md:w-8 h-5 w-5"
        />
      </span>
      <span>
        <p className="md:text-[1.1em] text-sm">{text}</p>
      </span>

      <AnimatePresence>{showTooltip && <Tooltip text={alt} />}</AnimatePresence>
    </li>
  );
}
