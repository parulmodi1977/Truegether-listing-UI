import { Menu, Search, User, ShoppingCart } from "lucide-react";
import { product } from "@/data/listing";
import { useScrollDirection } from "@/hooks/useScrollDirection";

interface MobileHeaderProps {
  cartCount?: number;
  onMenuOpen?: () => void;
  onSearchOpen?: () => void;
}

function MobileHeader({
  cartCount = product.cartCount,
  onMenuOpen,
  onSearchOpen,
}: MobileHeaderProps) {
  const direction = useScrollDirection();
  const isHidden = direction === "down";

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white border-b border-gray-100 transition-transform duration-300 will-change-transform md:hidden ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between h-14 px-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMenuOpen}
            aria-label="Open menu"
            className="w-9 h-9 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Menu size={22} />
          </button>

          <a href="/" aria-label="TrueGether Home" className="flex items-center shrink-0">
            <img src="/truegether-footer-logo.png" alt="TrueGether" className="h-8 w-auto object-contain" />
          </a>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onSearchOpen}
            aria-label="Search"
            className="w-9 h-9 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Search size={20} />
          </button>

          <a
            href="#account"
            aria-label="Account"
            className="w-9 h-9 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <User size={20} />
          </a>

          <a
            href="#cart"
            aria-label={`Cart with ${cartCount} items`}
            className="relative w-9 h-9 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[#F5A623] text-[9px] font-bold text-[#04352A] leading-none">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </header>
  );
}

export default MobileHeader;
