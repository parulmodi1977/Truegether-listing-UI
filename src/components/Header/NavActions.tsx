import { ShoppingCart } from "lucide-react";

interface NavActionsProps {
  cartCount?: number;
}

function NavActions({ cartCount = 0 }: NavActionsProps) {
  return (
    <nav className="flex items-center gap-6 shrink-0 text-xs font-semibold tracking-wide text-white">
      <a href="#help" className="hidden whitespace-nowrap transition-colors hover:text-[#7AC142] lg:inline">
        HELP & CONTACT
      </a>
      <a href="#signin" className="hidden whitespace-nowrap transition-colors hover:text-[#7AC142] md:inline">
        SIGN IN
      </a>
      <a href="#sell" className="hidden whitespace-nowrap transition-colors hover:text-[#7AC142] md:inline">
        SELL
      </a>
      <a href="#cart" className="relative flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[#7AC142]">
        <span className="relative">
          <ShoppingCart size={18} />
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#F5A623] text-[9px] font-bold leading-none text-[#04352A]">
            {cartCount}
          </span>
        </span>
        <span>CART</span>
      </a>
    </nav>
  );
}

export default NavActions;
