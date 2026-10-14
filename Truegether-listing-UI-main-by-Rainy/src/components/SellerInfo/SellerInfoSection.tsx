import { Star, ShoppingBag, Box, Check } from "lucide-react";
import { product } from "@/data/listing";

function SellerInfoSection() {
  const { seller } = product;

  // We use the first image from the listing as requested by the user
  const sellerAvatarImage = product.images[0]?.src || "https://i.ebayimg.com/images/g/Z3IAAeSw2MZoeTlo/s-l1000.jpg";

  return (
    <section className="mt-6 rounded-xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900 sm:text-lg mb-5">
        Seller Information
      </h2>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Side: Avatar, Name, Rating, Location */}
        <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
          <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-full border border-gray-200 overflow-hidden shadow-sm">
            <img
              src={sellerAvatarImage}
              alt={seller.username}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-gray-900 truncate">{seller.username}</span>
              {seller.verified && (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1DA1F2] text-white">
                  <Check size={10} strokeWidth={4} />
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
              {/* 5 Stars */}
              <div className="flex items-center text-[#F5A623]">
                <Star size={14} className="fill-current" />
                <Star size={14} className="fill-current" />
                <Star size={14} className="fill-current" />
                <Star size={14} className="fill-current" />
                <Star size={14} className="fill-current" />
              </div>
              <span className="font-semibold text-gray-800">{seller.rating.toFixed(1)} Seller Rating</span>
              <span className="text-gray-300">|</span>
              <a href="#" className="underline hover:text-emerald-800 font-medium">
                {seller.feedbackCount} Feedback
              </a>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium mt-0.5 min-w-0">
              <span className="truncate">{seller.location}</span>
              <span className="shrink-0">{seller.countryFlag}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Current Listings & Items Sold */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8 shrink-0 md:border-l md:border-gray-100 md:pl-6 lg:pl-8">
          {/* Current Listings */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
              <ShoppingBag size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">
                {seller.currentListings.toLocaleString()}
              </div>
              <div className="text-xs font-medium text-gray-400">Current Listings</div>
            </div>
          </div>

          {/* Items Sold */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
              <Box size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{seller.itemsSold}</div>
              <div className="text-xs font-medium text-gray-400">Items Sold</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="w-full sm:w-auto min-w-[200px] rounded-md border border-emerald-800 px-6 py-2 text-sm font-semibold text-emerald-800 bg-white transition-colors hover:bg-emerald-50 cursor-pointer text-center"
        >
          View Seller Profile
        </button>
      </div>
    </section>
  );
}

export default SellerInfoSection;