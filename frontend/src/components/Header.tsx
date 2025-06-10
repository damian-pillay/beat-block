import ActionButton from "./Buttons/ActionButton";
import SearchBar from "./SearchBar";
import GreetingMessage from "./GreetingMessage";

export default function Header() {
  return (
    <div className="flex flex-col gap-4 relative pb-5 pt-6">
      <GreetingMessage userFirstName="Damian" />
      <div className="flex gap-1.5 items-center w-[90%] mx-auto justify-center max-w-[85%] md:w-3xl">
        <SearchBar />
        <div className="flex gap-1 w-fit">
          <ActionButton icon="filter_alt" ariaLabel="Filter" />
          <ActionButton icon="sort" ariaLabel="Sort" />
        </div>
      </div>
    </div>
  );
}
