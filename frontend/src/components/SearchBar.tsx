export default function SearchBar() {
  return (
    <div className="flex items-center w-full bg-[#272626] rounded-4xl px-4 h-full hover:bg-[#3a3a3a] transition focus-within:bg-[#3a3a3a]">
      <span className="material-icons text-gray-400 mr-3 select-none pointer-events-none">
        search
      </span>
      <input
        type="text"
        placeholder="Search for a project"
        className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
}
