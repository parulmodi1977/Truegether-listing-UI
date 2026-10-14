import { Home, MessageCircle, Search, ShoppingBag, UserRound } from "lucide-react";

function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="relative grid h-14 grid-cols-4 items-center px-2">
        <a
          href="#"
          aria-label="Home"
          className="flex h-full items-center justify-center text-teal-700"
        >
          <Home size={19} strokeWidth={1.8} />
        </a>
        <a
          href="#"
          aria-label="Search"
          className="flex h-full items-center justify-center text-gray-800"
        >
          <Search size={19} strokeWidth={1.8} />
        </a>
        <a
          href="#"
          aria-label="Account"
          className="flex h-full items-center justify-center text-gray-800"
        >
          <UserRound size={19} strokeWidth={1.8} />
        </a>
        <a
          href="#"
          aria-label="Shopping bag"
          className="flex h-full items-center justify-center text-gray-800"
        >
          <ShoppingBag size={19} strokeWidth={1.8} />
        </a>

        <button
          type="button"
          aria-label="Open chat"
          className="absolute -top-6 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#168AC8] text-white shadow-[0_8px_18px_rgba(22,138,200,0.36)]"
        >
          <MessageCircle size={20} fill="currentColor" strokeWidth={1.8} />
        </button>
      </div>
    </nav>
  );
}

export default MobileBottomNav;
