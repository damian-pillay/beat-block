import { useState, useRef, useCallback } from "react";

export default function useToolTip(delay = 500) {
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

  return {
    showTooltip,
    handleMouseEnter,
    handleMouseLeave,
  };
}
