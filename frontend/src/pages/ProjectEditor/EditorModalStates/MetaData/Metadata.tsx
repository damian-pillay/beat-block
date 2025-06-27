import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

export default function Metadata() {
  const [selected, setSelected] = useState<string | null>(null);

  const toggleSelect = (daw: string) => {
    setSelected(daw);
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
    <>
      <motion.section className="flex flex-col gap-2 w-full h-full">
        <h4 className="font-bold">DIGITAL AUDIO WORKSTATION</h4>
        <section className="flex flex-wrap justify-center gap-6 py-3 w-full">
          {daws.map((daw, index) => (
            <motion.button
              key={index}
              onClick={() => toggleSelect(daw)}
              type="button"
              className={`relative transition flex items-center gap-4 rounded-full w-60 p-2 cursor-pointer ${
                selected === daw
                  ? "bg-green-600/20 text-white"
                  : "bg-[#383737] text-gray-200 hover:bg-[#4c4b4b]"
              }`}
            >
              <AnimatePresence>
                {selected === daw && (
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
      </motion.section>
    </>
  );
}
