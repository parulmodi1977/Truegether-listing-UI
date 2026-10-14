import { ChevronDown, Search } from "lucide-react";

const CATEGORIES = ["All Categories"];

function SearchBar() {
  return (
    <form
      role="search"
      className="flex w-full max-w-[420px] h-10 items-stretch bg-white rounded-full overflow-hidden shrink"
    >
      <input
        type="text"
        placeholder="Search for anything..."
        className="flex-1 min-w-0 px-4 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
      />

      <div className="hidden sm:flex items-center gap-1 px-3 border-l border-gray-200 text-sm text-gray-600 shrink-0 whitespace-nowrap select-none cursor-pointer">
        <span>{CATEGORIES[0]}</span>
        <ChevronDown size={14} className="text-gray-500" />
      </div>

      <button
        type="submit"
        aria-label="Search"
        className="flex items-center justify-center w-11 shrink-0 bg-[#04352A] hover:bg-[#052E25] transition-colors"
      >
        <Search size={16} className="text-white" />
      </button>
    </form>
  );
}

export default SearchBar;