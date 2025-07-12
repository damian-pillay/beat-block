import { Link } from "react-router-dom";
import {
  BeatblockLogo,
  BeatblockLogoSmall,
  DefaultProfileIcon,
} from "../../../../assets/icons";
import NavMenu from "./NavMenu";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between bg-[#171515] select-none overflow-hidden flex-shrink-0 drag-none">
      <section className="flex items-center h-full w-1/3 md:px-12 px-8">
        <NavMenu />
      </section>

      <Link
        className="flex items-center justify-center h-full w-1/3 px-10 py-6"
        to={"/"}
      >
        <img
          src={BeatblockLogo}
          alt="BEATBLOCK Logo"
          className="hidden sm:block h-18 drag-none"
        />
        <img
          src={BeatblockLogoSmall}
          alt="BEATBLOCK Logo Small"
          className="block sm:hidden h-12 drag-none"
        />
      </Link>

      <section className="flex justify-end items-center h-full w-1/3 md:px-8 px-6">
        <button
          className="text-white text-2xl rounded-full cursor-pointer"
          aria-label="profile"
        >
          <img
            src={DefaultProfileIcon}
            alt="profile icon"
            className="md:h-12 md:w-12 w-8 h-8 drag-none"
          />
        </button>
      </section>
    </nav>
  );
}
