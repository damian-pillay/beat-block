import SearchBar from "./SearchBar";
import GreetingMessage from "./GreetingMessage";
import AddButton from "./AddButton";
import UploadModal from "./UploadModal";
import { useState } from "react";

export default function Dashboard() {
  const [isUploadReady, setIsUploadReady] = useState(false);

  function handleToggle() {
    setIsUploadReady((prev) => !prev);
  }

  return (
    <div className="flex flex-col gap-4 relative pb-5 pt-6">
      <GreetingMessage />
      <div className=" relative flex gap-1.5 items-center w-[90%] mx-auto justify-center max-w-[85%] md:w-3xl">
        <UploadModal isOpen={isUploadReady} />
        <SearchBar />
        <div className="flex gap-1 w-fit h-12">
          {/* <ActionButton icon="filter_alt" ariaLabel="Filter" />
          <ActionButton icon="sort" ariaLabel="Sort" /> */}
          <AddButton isOpen={isUploadReady} handleToggle={handleToggle} />
        </div>
      </div>
    </div>
  );
}
