import BeatblockLogo from "../assets/BEATBLOCK.svg";
import MenuIcon from "../assets/menu.svg";
import UploadIcon from "../assets/upload.svg";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#171515] select-none">
      <button className="text-white text-2xl" aria-label="Menu">
        <img src={MenuIcon} alt="Menu Icon" className="h-8 w-8" />
      </button>

      <img src={BeatblockLogo} alt="BEATBLOCK Logo" className="h-18" />

      <button className="text-white text-2xl" aria-label="Upload">
        <img src={UploadIcon} alt="Upload Icon" className="h-8 w-8" />
      </button>
    </nav>
  );
}
