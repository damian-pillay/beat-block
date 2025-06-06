import ActionButton from "./Buttons/ActionButton";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="relative overflow-hidden mb-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-extrabold text-white text-center pt-10">
        Good Afternoon, Damian.
      </h1>
      <div className="flex items-center justify-center pt-4">
        <SearchBar />
        <div className="ml-2 flex space-x-2">
          <ActionButton icon="filter_alt" ariaLabel="Filter" />
          <ActionButton icon="sort" ariaLabel="Sort" />
        </div>
      </div>
    </div>
  );
}
