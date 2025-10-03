interface OnboardingFormInputProps {
  title: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  isRequired: boolean;
}

export default function OnboardingFormInput({
  title,
  type,
  placeholder,
  value = "",
  onChange = () => {},
  error,
  isRequired,
}: OnboardingFormInputProps) {
  return (
    <section className="w-full flex flex-col gap-1">
      <label className="block text-sm text-white px-4 font-bold">
        {title.toUpperCase()}{" "}
        {isRequired ? <span className="text-red-500">*</span> : undefined}
      </label>
      <input
        type={type}
        className={`w-full p-2 bg-white/20 text-white placeholder-white/60 rounded-full px-4 z-12 focus:outline-none h-10 ${
          error ? "border border-red-500" : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && (
        <span className="text-red-500 text-sm px-4 mt-1 whitespace-pre-line">
          {error}
        </span>
      )}
    </section>
  );
}
