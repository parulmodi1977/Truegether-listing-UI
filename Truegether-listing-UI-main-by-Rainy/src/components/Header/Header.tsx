import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { product } from "@/data/listing";

function Header() {
  const cartCount = product.cartCount;

  return (
    <header className="hidden w-full border-b border-gray-100 bg-white md:block">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center text-black transition-colors hover:text-emerald-900"
          >
            <Menu size={24} strokeWidth={1.8} />
          </button>

          <a href="/" aria-label="TrueGether Home" className="flex shrink-0 items-center">
            <img
              src="/truegether-footer-logo.png"
              alt="TrueGether"
              className="h-12 w-auto object-contain"
            />
          </a>
        </div>

        <nav className="flex items-center gap-6 text-black">
          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center transition-colors hover:text-emerald-900"
          >
            <Search size={23} strokeWidth={1.8} />
          </button>

          <a
            href="#account"
            aria-label="Account"
            className="flex h-9 w-9 items-center justify-center transition-colors hover:text-emerald-900"
          >
            <UserRound size={23} strokeWidth={1.8} />
          </a>

          <a
            href="#cart"
            aria-label={`Cart with ${cartCount} items`}
            className="relative flex h-9 w-9 items-center justify-center transition-colors hover:text-emerald-900"
          >
            <ShoppingBag size={23} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#04352A] px-1 text-[9px] font-bold leading-none text-white">
                {cartCount}
              </span>
            )}
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
