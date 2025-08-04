interface OnboardingFormInputProps {
  title: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function OnboardingFormInput({
  title,
  type,
  placeholder,
  value = "",
  onChange = () => {},
}: OnboardingFormInputProps) {
  return (
    <section className="w-full flex flex-col gap-1">
      <label className="block text-sm text-white px-4 font-bold">
        {title.toUpperCase()}
      </label>
      <input
        type={type}
        className="w-full p-2 bg-white/20 text-white placeholder-white/60 rounded-full px-4 z-12 focus:outline-none h-10"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </section>
  );
}
