import logo from "@/assets/truegether-logo.png";

function Logo() {
  return (
    <a href="/" className="flex items-center shrink-0" aria-label="TrueGether Home">
      <img
        src={logo}
        alt="TrueGether - Building Trust Together"
        className="h-9 w-auto object-contain sm:h-10"
      />
    </a>
  );
}

export default Logo;
