import { useState, type ChangeEvent } from "react";

type TextInputProps = {
  title: string;
  charLimit: number;
  placeholder?: string;
  lineHeight?: number;
};

export default function TextInput({
  title,
  charLimit,
  placeholder,
  lineHeight = 1,
}: TextInputProps) {
  const [value, setValue] = useState("");

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const newValue = e.target.value;

    if (newValue.length <= charLimit) {
      setValue(newValue);
    }
  }

  const boxHeight = 2.6 + 2 * (lineHeight - 1);

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h4 className="uppercase font-bold">{title}</h4>
        <h4 className="text-right opacity-50">
          {value.length}/{charLimit}
        </h4>
      </div>
      <textarea
        className={`
          border border-white/50 focus:border-white
          focus:outline-none
          transition-colors duration-300 
          rounded-md p-2 resize-none h-[${boxHeight}rem]
        `}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </section>
  );
}
