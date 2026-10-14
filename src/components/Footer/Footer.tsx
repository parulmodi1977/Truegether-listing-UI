// Footer uses a public asset so the image can be replaced without rebuilding
const logoUrl = "/truegether-footer-logo.png";

function Footer() {
  return (
    <footer className="w-full bg-white mt-2 px-4 pt-10 pb-44 lg:mt-12 lg:py-10">
      <div className="mx-auto max-w-[1280px] sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="flex flex-col items-center justify-between gap-7 pb-8 md:flex-row">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logoUrl} alt="Truegether" className="h-14 w-auto object-contain md:h-16" />
          </div>

          {/* Links */}
          <div className="flex flex-col items-center justify-center gap-6 text-[12px] font-bold text-black md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-3 md:text-sm md:text-gray-800">
            <a href="#" className="hover:text-emerald-800 transition-colors">About Us</a>
            <a href="#" className="hover:text-emerald-800 transition-colors">Contact Us</a>
            <a href="#" className="hover:text-emerald-800 transition-colors">Blog</a>
            <a href="#" className="hover:text-emerald-800 transition-colors">All Categories</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-2 md:gap-3 md:pt-0">
            {/* Facebook circle */}
            <a href="#" className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity md:h-8 md:w-8">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-.8.4-.8.8v1.2h2.724l-.362 3h-2.362v8h-3v-8h-2v-3h2v-2.084c0-2.24 1.36-3.416 3.416-3.416.984 0 1.832.072 2.076.104v2.416z"/>
              </svg>
            </a>
            {/* LinkedIn square */}
            <a href="#" className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#0A66C2] text-white hover:opacity-90 transition-opacity md:h-8 md:w-8 md:rounded">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Separator line */}
        <hr className="my-6 border-gray-300 md:border-gray-200" />

        {/* Resources Section */}
        <div className="py-3 text-center md:py-6">
          <h4 className="mb-3 text-[12px] font-bold text-black md:mb-4 md:text-sm md:text-gray-900">Resources</h4>
          <div className="mx-auto flex max-w-sm flex-wrap justify-center gap-x-1 gap-y-0.5 text-[10px] font-medium leading-relaxed text-gray-600 underline md:max-w-4xl md:gap-x-2 md:gap-y-1.5 md:text-xs md:text-gray-500 md:no-underline">
            <a href="#" className="hover:underline">Sell on TrueGether</a> <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">Best eBay Alternative</a> <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">Best Shopify Alternative</a> <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">Pricing</a> <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">Returns and Refunds</a> <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">Terms and Conditions</a> <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">Payment Information and Buyer Protection</a> <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">Contact Information</a> <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">Shipping Policy</a> <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="py-6 text-center">
          <h4 className="mb-3 text-sm font-bold text-black md:mb-4 md:text-gray-900">Payment Methods</h4>
          <div className="flex justify-center items-center gap-3">
            {/* PayPal */}
            <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm md:h-8 md:w-8">
              <svg className="h-4 w-4 text-[#003087] fill-current" viewBox="0 0 24 24">
                <path d="M20.01 6.81C20.01 3.05 17.5 1 13.06 1H5.72c-.44 0-.81.33-.87.77L1.6 22.09c-.07.47.29.91.76.91h4.94c.39 0 .73-.28.79-.67l1.37-8.7c.06-.39.4-.67.79-.67h1.4c3.82 0 6.8-1.55 7.68-6 .22-1.07.33-2.1.33-3.15z"/>
              </svg>
            </div>
            {/* Stripe (S) */}
            <div className="flex h-5 w-5 cursor-pointer select-none items-center justify-center rounded-full bg-[#635BFF] text-[10px] font-black italic text-white shadow-sm md:h-8 md:w-8 md:text-sm">
              S
            </div>
            {/* Amazon Pay/Pay Circle badge */}
            <div className="flex h-5 w-5 cursor-pointer select-none items-center justify-center rounded-full bg-[#232F3E] text-[7px] font-extrabold text-[#FF9900] shadow-sm md:h-8 md:w-8 md:text-[10px]">
              pay
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-400 font-medium mt-4">
          © 2026 PixalSoft. All Rights Reserved
        </div>

      </div>
    </footer>
  );
}

export default Footer;
