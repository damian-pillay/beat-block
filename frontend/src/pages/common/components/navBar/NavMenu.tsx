import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LineTexture } from "../../../../assets/textures";
import MenuButton from "./MenuButton";
import LogOutMenuItem from "./MenuItems/LogOutMenuItem";

export default function NavMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLDivElement).contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  const menuItems = [{ component: LogOutMenuItem }];

  return (
    <div className="absolute block" ref={menuRef}>
      <MenuButton isOpen={menuOpen} toggleMenu={toggleMenu} />
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-6 left-6 shadow-lg rounded-lg z-35 bg-[#272626] w-50 origin-top-left pb-5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="flex justify-end pt-[2.8%] pr-7">
              <img
                src={LineTexture}
                alt="line texture"
                className="object-cover h-15 w-24 opacity-50"
              />
            </div>

            <ul className="flex flex-col justify-center items-center">
              {menuItems.map((menuItem, index) => (
                <menuItem.component key={`menu-item-${index}`} index={index} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
