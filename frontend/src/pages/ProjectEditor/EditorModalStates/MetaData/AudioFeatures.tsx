import Dropdown from "./Dropdown";

export default function AudioFeatures() {
  const features = ["Key", "Tempo (BPM)", "Genre"];

  return (
    <section className="flex flex-col gap-2 w-full">
      <h4 className="font-bold border">AUDIO FEATURES</h4>
      <ul className="flex flex-col justify-center items-center gap-5 border">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex gap-10 justify-between items-center w-[80%]"
          >
            <label className="w-[30%] border">{feature}</label>
            <Dropdown />
          </li>
        ))}
      </ul>
    </section>
  );
}
