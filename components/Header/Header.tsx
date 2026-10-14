import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavActions from "./NavActions";
import { product } from "@/data/listing";

function Header() {
  return (
    <header className="bg-[#04352A] w-full">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 h-16">
        <Logo />
        <SearchBar />
        <NavActions cartCount={product.cartCount} />
      </div>
    </header>
  );
}

export default Header;