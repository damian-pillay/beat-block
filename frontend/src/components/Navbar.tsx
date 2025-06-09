import BeatblockLogo from "../assets/BEATBLOCK.svg";
import BeatblockLogoSmall from "../assets/beatblock-icon-only.svg";
import MenuIcon from "../assets/menu.svg";
import UploadIcon from "../assets/upload.svg";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#171515] select-none overflow-hidden flex-shrink-0">
      <button className="text-white text-2xl" aria-label="Menu">
        <img src={MenuIcon} alt="Menu Icon" className="h-6 w-6" />
      </button>

      <img
        src={BeatblockLogo}
        alt="BEATBLOCK Logo"
        className="hidden sm:block h-18"
      />
      <img
        src={BeatblockLogoSmall}
        alt="BEATBLOCK Logo Small"
        className="block sm:hidden h-12"
      />

      <button className="text-white text-2xl" aria-label="Upload">
        <img src={UploadIcon} alt="Upload Icon" className="h-6 w-6" />
      </button>
    </nav>
  );
}
