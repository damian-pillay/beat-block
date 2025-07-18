import { AnimatePresence } from "framer-motion";
import { useRef, useCallback, useState } from "react";
import Tooltip from "./ToolTip";

interface ToolTipProviderProps {
  text: string;
  delay?: number;
  children: (triggerProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    renderToolTip: () => React.ReactNode;
  }) => React.ReactNode;
}

export default function ToolTipProvider({
  text,
  delay = 500,
  children,
}: ToolTipProviderProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, delay);
  }, [delay]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowTooltip(false);
  }, []);

  return (
    <>
      {children({
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        renderToolTip: () => (
          <AnimatePresence>
            {showTooltip && <Tooltip text={text} />}
          </AnimatePresence>
        ),
      })}
    </>
  );
}
