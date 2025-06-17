import {
  GridTexture,
  LineTexture,
  ArrowTexture,
  HalfGridTexture,
} from "../../assets/textures";

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
          opacity-40
        "
      />

      <img
        src={HalfGridTexture}
        alt="Noise Texture"
        className="
          absolute
          top-[260px]
          right-0
          w-40 
          md:w-60 
          pointer-events-none 
          select-none
          overflow-hidden
          opacity-40
          z-[-1]"
      />

      <img
        src={ArrowTexture}
        alt="Arrow Texture"
        className="
          absolute 
          top-[290px]
          left-[8vw] 
          md:w-20 
          sm:w-15 
          w-15
          pointer-events-none 
          select-none
          opacity-40
          z-[-1]
          "
      />

      <img
        src={LineTexture}
        alt="Line Texture"
        className="
          absolute 
          bottom-[200px]
          left-1/2
          transform 
          -translate-x-1/2
          opacity-20
          md:w-25
          sm:w-20 
          w-15
          pointer-events-none 
          select-none
          z-[-1]
          "
      />
    </>
  );
}
