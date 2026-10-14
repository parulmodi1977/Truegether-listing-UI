import { ShoppingCart } from "lucide-react";

interface NavActionsProps {
  cartCount?: number;
}

function NavActions({ cartCount = 0 }: NavActionsProps) {
  return (
    <nav className="flex items-center gap-6 shrink-0 text-white text-xs font-semibold tracking-wide">
      <a
        href="#help"
        className="hidden lg:inline hover:text-[#7AC142] transition-colors whitespace-nowrap"
      >
        HELP &amp; CONTACT
      </a>
      <a
        href="#signin"
        className="hidden md:inline hover:text-[#7AC142] transition-colors whitespace-nowrap"
      >
        SIGN IN
      </a>
      <a
        href="#sell"
        className="hidden md:inline hover:text-[#7AC142] transition-colors whitespace-nowrap"
      >
        SELL
      </a>
      <a
        href="#cart"
        className="relative flex items-center gap-1.5 hover:text-[#7AC142] transition-colors whitespace-nowrap"
      >
        <span className="relative">
          <ShoppingCart size={18} />
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 rounded-full bg-[#F5A623] text-[#04352A] text-[9px] font-bold leading-none">
            {cartCount}
          </span>
        </span>
        <span>CART</span>
      </a>
    </nav>
  );
}

export default NavActions;