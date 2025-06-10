import TrebleClefIcon from "../../assets/projectblock-icons/treble-clef.svg";
import DrumIcon from "../../assets/projectblock-icons/drums.svg";
import MusicIcon from "../../assets/projectblock-icons/music.svg";
import SliderIcon from "../../assets/projectblock-icons/sliders.svg";
import IconLabel from "./IconLabel";

export default function ProjectMetaData({
  keySignature,
  bpm,
  genre,
  daw,
}: {
  keySignature: string;
  bpm: number;
  genre: string;
  daw: string;
}) {
  return (
    <section className="flex justify-center items-end h-[100%] max-h-[100%] border-amber-600 md:pr-9">
      <section className="flex justify-center w-full">
        <ul className="flex flex-col gap-2">
          <IconLabel
            icon={TrebleClefIcon}
            text={keySignature}
            alt="Key Signature"
          />
          <IconLabel
            icon={DrumIcon}
            text={bpm + " BPM"}
            alt="Beats Per Minute"
          />
        </ul>
      </section>
      <section className="flex justify-center w-full">
        <ul className="flex flex-col gap-2">
          <IconLabel icon={MusicIcon} text={genre} alt="Genre" />
          <IconLabel
            icon={SliderIcon}
            text={daw}
            alt="Digital Audio Workstation"
          />
        </ul>
      </section>
    </section>
  );
}
