import GridTexture from "../assets/grid-texture.svg";
import ArrowTexture from "../assets/arrow-texture.svg";

export default function ScreenTexture() {
  return (
    <>
      <img
        src={GridTexture}
        alt="Noise Texture"
        className="
          absolute 
          md:top-[-140px] 
          left-[12vw] 
          md:w-58 
          pointer-events-none 
          select-none 
          overflow-hidden
          [@media(max-width:1000px)]:hidden
        "
      />

      <img
        src={GridTexture}
        alt="Noise Texture"
        className="
          absolute
          top-[260px]
          right-[-20vw] 
          sm:right-[-80px] 
          md:right-[-110px] 
          w-40 
          md:w-60 
          pointer-events-none 
          select-none
          overflow-hidden"
      />

      <img
        src={ArrowTexture}
        alt="Noise Texture"
        className="
          absolute 
          top-[220px]
          left-[8vw] 
          md:w-20 
          sm:w-15 
          w-[0] 
          pointer-events-none 
          select-none
          "
      />
    </>
  );
}
