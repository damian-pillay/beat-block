import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative inline-block text-left w-[70%]">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-between items-center w-full px-4 py-2 bg-[#383737] text-white rounded-full shadow-md cursor-pointer hover:bg-[#4c4b4b] transition"
      >
        Select Option
        <ChevronDown
          className={`ml-2 w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <ul className="divide-y divide-[#4c4b4b]">
              {["Lo-fi", "Trap", "House", "Pop"].map((genre) => (
                <li
                  key={genre}
                  onClick={() => {
                    console.log("Selected:", genre);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2  hover:bg-[#4c4b4b] cursor-pointer bg-[#383737]"
                >
                  {genre}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
