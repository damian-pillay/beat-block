import DefaultAudioImage from "../assets/default-audio-image.svg";
import TrebleClefIcon from "../assets/projectblock-icons/treble-clef.svg";
import DrumIcon from "../assets/projectblock-icons/drums.svg";
import MusicIcon from "../assets/projectblock-icons/music.svg";
import SliderIcon from "../assets/projectblock-icons/sliders.svg";

export default function ProjectBlock({ project }: { project: any }) {
  return (
    <div className="flex md:h-48 h-38 w-full mx-auto [@media(max-width:1280px)]:max-w-[780px] rounded-4xl bg-[#272626] p-5 justify-between gap-5 items-center hover:bg-[#383737] transition cursor-pointer">
      <img
        src={DefaultAudioImage}
        alt="default audio icon"
        className="h-full rounded-3xl object-cover"
      />
      <div className="flex flex-col justify-between w-full h-full">
        <section className="flex flex-col font-montserrat justify-between w-full flex-grow">
          <h3 className="font-montserrat font-extrabold text-white md:text-xl text-[1em]">
            {project.name}
          </h3>
          <p className="font-montserrat font-normal h-[90%] text-[#848484] md:text-sm text-[0.55em] text-justify">
            {project.description}
          </p>
        </section>
        <section className="flex justify-center items-end h-[100%] max-h-[100%] border-amber-600 md:pr-9">
          <section className="flex justify-center w-full">
            <ul className="flex flex-col gap-2">
              <li className="flex justify-start items-center gap-2">
                <span>
                  <img
                    src={TrebleClefIcon}
                    alt="treble clef icon"
                    className="object-cover md:h-8 md:w-8 h-5 w-5"
                  />
                </span>
                <span>
                  <p className="md:text-[1.1em] text-sm">
                    {project.keySignature}
                  </p>
                </span>
              </li>
              <li className="flex justify-start items-center gap-2">
                <span>
                  <img
                    src={DrumIcon}
                    alt="treble clef icon"
                    className="object-cover md:h-8 md:w-8 h-5 w-5"
                  />
                </span>
                <span>
                  <p className="md:text-[1.1em] text-sm">{project.bpm} BPM</p>
                </span>
              </li>
            </ul>
          </section>
          <section className="flex justify-center w-full">
            <ul className="flex flex-col gap-2">
              <li className="flex justify-start items-center gap-2">
                <span>
                  <img
                    src={MusicIcon}
                    alt="treble clef icon"
                    className="object-cover md:h-8 md:w-8 h-5 w-5"
                  />
                </span>
                <span>
                  <p className="md:text-[1.1em] text-sm">{project.genre}</p>
                </span>
              </li>
              <li className="flex justify-start items-center gap-2">
                <span>
                  <img
                    src={SliderIcon}
                    alt="treble clef icon"
                    className="object-cover md:h-8 md:w-8 h-5 w-5"
                  />
                </span>
                <span>
                  <p className="md:text-[1.1em] text-sm">{project.daw}</p>
                </span>
              </li>
            </ul>
          </section>
        </section>
      </div>
    </div>
  );
}
