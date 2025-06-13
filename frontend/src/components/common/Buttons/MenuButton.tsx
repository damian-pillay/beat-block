import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function MenuButton({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) {
  const path1Controls = useAnimation();
  const path2Controls = useAnimation();
  const path3Controls = useAnimation();

  const path1Variants = {
    open: { d: "M3 3L21 21" },
    closed: { d: "M0 5L24 5" },
  };

  const path3Variants = {
    open: { opacity: 0 },
    closed: { opacity: 1, d: "M0 12L24 12" },
  };

  const path2Variants = {
    open: { d: "M3 21L21 3" },
    closed: { d: "M0 19L24 19" },
  };

  useEffect(() => {
    if (isOpen) {
      path1Controls.start({
        ...path1Variants.open,
        transition: { duration: 0.3 },
      });
      path2Controls.start({
        ...path2Variants.open,
        transition: { duration: 0.3 },
      });
      path3Controls.start({
        ...path3Variants.open,
        transition: { duration: 0.2 },
      });
    } else {
      path1Controls.start({
        ...path1Variants.closed,
        transition: { duration: 0.3 },
      });
      path2Controls.start({
        ...path2Variants.closed,
        transition: { duration: 0.3 },
      });
      path3Controls.start({
        ...path3Variants.closed,
        transition: { duration: 0.2 },
      });
    }
  }, [isOpen]);

  return (
    <button
      onClick={toggleMenu}
      className="relative flex flex-col justify-self-center gap-2 cursor-pointer stroke-white z-36"
    >
      <svg
        className="md:w-6.5 md:h-6.5 w-5.5 h-5.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <motion.path {...path1Variants.closed} animate={path1Controls} />
        <motion.path {...path3Variants.closed} animate={path3Controls} />
        <motion.path {...path2Variants.closed} animate={path2Controls} />
      </svg>
    </button>
  );
}
