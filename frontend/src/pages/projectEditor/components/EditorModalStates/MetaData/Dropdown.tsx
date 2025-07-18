import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useProjectStore } from "../../../services/useProjectStore";
import type { ProjectRequest } from "../../../../common/types/projectRequest";

export default function Dropdown({
  options,
  value,
}: {
  options?: string[] | number[];
  value: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { requestForm: project, updateRequestForm: updateProject } =
    useProjectStore();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left w-[70%]">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-between items-center w-full px-4 py-2 bg-[#383737] text-white rounded-full shadow-md cursor-pointer hover:bg-[#4c4b4b] transition"
      >
        {(() => {
          const fieldValue = project[value as keyof ProjectRequest];
          if (
            typeof fieldValue === "string" ||
            typeof fieldValue === "number"
          ) {
            return fieldValue;
          }
          return "Select an option";
        })()}
        <ChevronDown
          className={`ml-2 w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full rounded-lg shadow-lg rounded-scrollbar max-h-48 overflow-y-auto"
          >
            <ul className="divide-y divide-[#4c4b4b]">
              {["-- none --", ...(options ?? [])].map((genre) => (
                <li
                  key={genre}
                  onClick={() => {
                    updateProject({ [value]: genre });
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-[#4c4b4b] cursor-pointer bg-[#383737] text-white"
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
