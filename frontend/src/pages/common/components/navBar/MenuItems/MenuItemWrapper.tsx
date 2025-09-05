import { motion } from "framer-motion";

interface MenuItemWrapperProps {
  children: string;
  onClick: () => void;
  delay: number;
}

export default function MenuItemWrapper({
  children,
  onClick,
  delay,
}: MenuItemWrapperProps) {
  return (
    <motion.li
      key={`menu-item-${children}`}
      className="py-2 px-4 cursor-pointer"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: delay }}
      exit={{ x: -20, opacity: 0 }}
      onClick={onClick}
    >
      <motion.span
        style={{ color: "#ffffff", fontSize: "medium" }}
        whileHover={{
          color: "#848484",
          transition: {
            duration: 0.1,
            ease: "easeInOut",
          },
        }}
        whileTap={{
          color: "#ff0000",
          transition: { duration: 0.05, ease: "backOut" },
        }}
        className="select-none cursor-pointer"
      >
        {children}
      </motion.span>
    </motion.li>
  );
}
