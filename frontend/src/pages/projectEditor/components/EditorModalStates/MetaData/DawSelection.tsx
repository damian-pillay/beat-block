import { AnimatePresence, motion } from "framer-motion";
import { useProjectStore } from "../../../services/useProjectStore";
import { Check } from "lucide-react";

export default function DawSelection() {
  const { requestForm: project, updateRequestForm: updateProject } =
    useProjectStore();

  const toggleSelect = (daw: string) => {
    updateProject({ daw: daw });
  };

  const daws = [
    "FL Studio",
    "Ableton Live",
    "Pro Tools",
    "Bitwig Studio",
    "Garage Band",
    "Logic Pro",
  ];

  return (
    <section className="flex flex-col gap-2 w-full">
      <h4 className="font-bold">DIGITAL AUDIO WORKSTATION *</h4>
      <p>Please select the Digital Audio Workstation (DAW) of your project</p>
      <section className="flex flex-wrap justify-center gap-6 py-5 w-full">
        {daws.map((daw, index) => (
          <motion.button
            key={index}
            onClick={() => toggleSelect(daw)}
            type="button"
            className={`relative transition flex items-center shadow-md gap-4 rounded-full w-60 p-2 cursor-pointer ${
              project.daw === daw
                ? "bg-green-600/20 text-white"
                : "bg-[#383737] text-gray-200 hover:bg-[#4c4b4b]"
            }`}
          >
            <AnimatePresence>
              {project.daw === daw && (
                <motion.span
                  key={"check"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-5"
                >
                  <Check />
                </motion.span>
              )}
            </AnimatePresence>
            <span className="flex-1 text-center">{daw}</span>
          </motion.button>
        ))}
      </section>
    </section>
  );
}
