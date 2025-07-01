import Dropdown from "./Dropdown";
import { features } from "../../../utils/audioFeaturesConfig";
import NumberInput from "./NumberInput";

export default function AudioFeatures() {
  return (
    <section className="flex flex-col gap-2 w-full">
      <h4 className="font-bold">AUDIO FEATURES</h4>
      <ul className="flex flex-col justify-center items-center gap-5">
        {features.map((feature, index) => (
          <li key={index} className="flex justify-between items-center w-[80%]">
            <label className="w-[30%]">{feature.name}</label>
            {feature.isDropdown && <Dropdown options={feature.options} />}
            {feature.isNumberInput && <NumberInput {...feature.options} />}
          </li>
        ))}
      </ul>
    </section>
  );
}
