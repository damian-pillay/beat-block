import { type ChangeEvent } from "react";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useProjectStore } from "../../../services/useProjectStore";

type NumberInputProps = {
  min?: number;
  max?: number;
  placeholder?: string;
  step?: number;
};

export default function NumberInput({
  min = 0,
  max = 999999,
  placeholder,
  step = 1,
}: NumberInputProps) {
  const { requestForm: project, updateRequestForm: updateProject } =
    useProjectStore();

  function isNaturalNumber(value: number): boolean {
    return Number.isInteger(value) && value >= 0;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    if (!isNaturalNumber(Number(newValue))) {
      return;
    } else if (newValue === "") {
      updateProject({ bpm: undefined });
    } else if (Number(newValue) < min || Number(newValue) > max) {
      updateProject({ bpm: Number(newValue) });
    } else {
      updateProject({ bpm: Number(newValue) });
    }
  }

  function renderValidationIcon() {
    if (project.bpm === undefined) {
      return <CircleAlert />;
    } else if (project.bpm >= min && project.bpm <= max) {
      return <CheckCircle2 className="text-[#4ade80]" />;
    }
    return <CircleAlert className="text-red-500" />;
  }

  return (
    <section className="w-[70%] flex items-center gap-4">
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        className={`
          appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none 
          [&::-webkit-outer-spin-button]:appearance-none
          border border-white/50 focus:border-white
          focus:outline-none
          transition-colors duration-300 
          rounded-md p-2
          w-[50%]
        `}
        placeholder={placeholder}
        value={project.bpm ?? ""}
        onChange={handleChange}
      />
      <p className="flex items-center gap-2 text-white/70">
        <AnimatePresence mode="wait">
          <motion.span
            key={project.bpm ?? "validation-icon"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {renderValidationIcon()}
          </motion.span>
        </AnimatePresence>
        <span>{`${min} - ${max} BPM`}</span>
      </p>
    </section>
  );
}
