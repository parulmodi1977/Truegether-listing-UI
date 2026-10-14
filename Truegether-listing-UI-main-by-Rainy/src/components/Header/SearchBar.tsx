import { ChevronDown, Search } from "lucide-react";

const CATEGORIES = ["All Categories"];

function SearchBar() {
  return (
    <form
      role="search"
      className="flex h-10 w-full max-w-[420px] items-stretch overflow-hidden rounded-full bg-white shadow-sm shrink"
    >
      <input
        type="text"
        placeholder="Search for anything..."
        className="min-w-0 flex-1 bg-transparent px-4 text-sm text-gray-700 outline-none placeholder:text-gray-400"
      />

      <div className="hidden shrink-0 cursor-pointer items-center gap-1 border-l border-gray-200 px-3 text-sm whitespace-nowrap text-gray-600 sm:flex">
        <span>{CATEGORIES[0]}</span>
        <ChevronDown size={14} className="text-gray-500" />
      </div>

      <button
        type="submit"
        aria-label="Search"
        className="flex w-11 shrink-0 items-center justify-center bg-[#04352A] transition-colors hover:bg-[#052E25]"
      >
        <Search size={16} className="text-white" />
      </button>
    </form>
  );
}

export default SearchBar;
