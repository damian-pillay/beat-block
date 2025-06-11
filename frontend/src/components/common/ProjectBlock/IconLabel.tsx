import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

export default function IconLabel({
  icon,
  text,
  alt,
}: {
  icon: string;
  text: string;
  alt: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowTooltip(false);
  };

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

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none"
          >
            {alt}
            <div className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black" />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
