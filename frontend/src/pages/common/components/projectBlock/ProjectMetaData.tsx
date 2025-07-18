import {
  TrebleClefIcon,
  DrumIcon,
  MusicIcon,
  SliderIcon,
} from "../../../../assets/icons";
import IconLabel from "./IconLabel";
import type { ProjectResponse } from "../../types/projectResponse";

type ProjectMetaDataProps = Pick<
  ProjectResponse,
  "keySignature" | "bpm" | "genre" | "daw"
>;

export default function ProjectMetaData({
  keySignature,
  bpm,
  genre,
  daw,
}: ProjectMetaDataProps) {
  return (
    <section className="flex justify-center items-end md:pr-9">
      <section className="flex justify-center w-full">
        <ul className="flex flex-col gap-2">
          <IconLabel
            icon={TrebleClefIcon}
            text={keySignature ?? "--"}
            alt="Key Signature"
          />
          <IconLabel
            icon={DrumIcon}
            text={bpm ? bpm + " BPM" : "--"}
            alt="Beats Per Minute"
          />
        </ul>
      </section>
      <section className="flex justify-center w-full">
        <ul className="flex flex-col gap-2">
          <IconLabel icon={MusicIcon} text={genre ?? "--"} alt="Genre" />
          <IconLabel
            icon={SliderIcon}
            text={daw ?? "--"}
            alt="Digital Audio Workstation"
          />
        </ul>
      </section>
    </section>
  );
}
