type TextInputProps = {
  title: string;
  charLimit: number;
  placeholder?: string;
};

export default function TextInput({
  title,
  charLimit,
  placeholder,
}: TextInputProps) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h4 className="uppercase font-bold">{title}</h4>
        <h4 className="text-right opacity-50">0/{charLimit}</h4>
      </div>
      <input className="border rounded-sm p-2" placeholder={placeholder} />
    </section>
  );
}
