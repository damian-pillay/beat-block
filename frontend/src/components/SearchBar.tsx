export default function SearchBar() {
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="flex items-center w-1/2 bg-[#272626] rounded-4xl px-4 py-3 hover:bg-[#3a3a3a] transition focus-within::bg-[#3a3a3a]">
        <span className="material-icons text-gray-400 mr-3 select-none pointer-events-none">
          search
        </span>
        <input
          type="text"
          placeholder="Search for a project"
          className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none "
        />
      </div>
      <div className="ml-2 flex space-x-2">
        <button
          className="bg-[#272626] text-white p-3 rounded-full hover:bg-[#3a3a3a] transition focus:outline-none"
          aria-label="Filter"
        >
          <span className="material-icons align-middle">filter_alt</span>
        </button>
        <button
          className="bg-[#272626] text-white p-3 rounded-full hover:bg-[#3a3a3a] transition focus:outline-none"
          aria-label="Sort"
        >
          <span className="material-icons align-middle">sort</span>
        </button>
      </div>
    </div>
  );
}
