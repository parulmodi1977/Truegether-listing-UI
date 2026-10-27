import { useState } from "react";
import { ShoppingCart, Tag, HelpCircle, ChevronUp, ChevronDown, Award, ShieldCheck, Truck, Check, Store, Star, ShoppingBag, Box } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import TrustBar from "@/components/TrustBar/TrustBar";
import ProductGallery from "@/components/ProductGallery/ProductGallery";
import MobileProductGallery from "@/components/ProductGallery/MobileProductGallery";
import MobileStickyBuyNow from "@/components/ProductGallery/MobileStickyBuyNow";
import MobileBottomNav from "@/components/ProductGallery/MobileBottomNav";
import MobileAddToCartSheet from "@/components/ProductGallery/MobileAddToCartSheet";
import ProductInfo from "@/components/ProductInfo/ProductInfo";
import CTASection from "@/components/CTASection/CTASection";
import ItemSpecifications from "@/components/ItemSpecifications/ItemSpecifications";
import SellerInfo from "@/components/SellerInfo/SellerInfoSection";
import Advertisement from "@/components/Advertisement/AdBanner";
import QuickFactRow from "@/components/CTASection/QuickFactRow";
import VariationSelector from "@/components/Variations/VariationSelector";
import { product } from "@/data/listing";

interface ListingDetailsPageProps {
  onBuyNow?: () => void;
  onAddToCart?: () => void;
}

function ListingDetailsPage({ onBuyNow, onAddToCart }: ListingDetailsPageProps) {
  const [listingOpen, setListingOpen] = useState(true);
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [specsOpen, setSpecsOpen] = useState(true);
  const [specsExpanded, setSpecsExpanded] = useState(false);
  const [cartSheetOpen, setCartSheetOpen] = useState(false);
  const [mobileSelected, setMobileSelected] = useState<Record<string, string>>({});

  function handleMobileSelect(variationId: string, value: string) {
    setMobileSelected((prev) => ({ ...prev, [variationId]: value }));
  }

  const { availableStock, guarantee, location, handlingTime, returns, condition, seller } = product;

  // Slices specs for progressive disclosure on mobile
  const specsEntries = Object.entries(product.specifications);
  const visibleSpecsEntries = specsExpanded ? specsEntries : specsEntries.slice(0, 8);
  const hasMoreSpecs = specsEntries.length > 8;

  return (
    <>
      {/* ---------------- MOBILE VIEW (md:hidden) ---------------- */}
      <div className="md:hidden w-full bg-gray-50 flex flex-col">
        {/* Ad Banner at top */}
        <Advertisement />

        {/* Product Gallery Carousel */}
        <MobileProductGallery />

        {/* Product Title and Sub-title */}
        <div className="px-4 py-4 bg-white border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-900 leading-snug">
            {product.title}
          </h1>
          <p className="text-xs text-gray-400 font-semibold mt-1">
            {product.category}
          </p>
        </div>

        {/* Trust Badges */}
        <div className="px-4 mt-3">
          <div className="grid grid-cols-3 gap-2 bg-white border border-gray-100 rounded-xl p-3 shadow-sm text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                <Truck size={14} />
              </div>
              <span className="text-[9px] font-bold text-gray-900 mt-1 uppercase tracking-tight">Timely Delivery</span>
              <span className="text-[8px] text-gray-500 font-medium">On all orders</span>
            </div>
            <div className="flex flex-col items-center border-x border-gray-100 px-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                <ShieldCheck size={14} />
              </div>
              <span className="text-[9px] font-bold text-gray-900 mt-1 uppercase tracking-tight">Secure Payments</span>
              <span className="text-[8px] text-gray-500 font-medium">100% protected</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                <Award size={14} />
              </div>
              <span className="text-[9px] font-bold text-gray-900 mt-1 uppercase tracking-tight">100% Satisfaction</span>
              <span className="text-[8px] text-gray-500 font-medium">Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Commerce CTAs */}
        <div className="px-4 mt-3 flex flex-col gap-2.5">
          {/* Primary CTA: Add To Cart */}
          <button
            type="button"
            onClick={() => setCartSheetOpen(true)}
            className="w-full h-12 bg-[#04352A] hover:bg-[#032820] active:scale-[0.99] rounded-lg text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <ShoppingCart size={16} />
            <span>ADD TO CART</span>
          </button>
          {/* Buy Now — mobile */}
          <button
            type="button"
            onClick={onBuyNow}
            className="w-full h-12 border border-[#04352A] hover:bg-emerald-50/50 active:scale-[0.99] rounded-lg text-[#04352A] font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer bg-white"
          >
            <span>BUY NOW</span>
          </button>

          {/* Secondary CTAs */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              className="h-11 rounded-lg border border-[#04352A] bg-white text-xs font-bold text-[#04352A] flex items-center justify-center gap-1.5 transition-colors hover:bg-emerald-50/50 cursor-pointer"
            >
              <Tag size={13} />
              <span>MAKE AN OFFER</span>
            </button>
            <button
              type="button"
              className="h-11 rounded-lg border border-[#04352A] bg-white text-xs font-bold text-[#04352A] flex items-center justify-center gap-1.5 transition-colors hover:bg-emerald-50/50 cursor-pointer"
            >
              <HelpCircle size={14} />
              <span>ASK A QUESTION</span>
            </button>
          </div>
        </div>

        {/* Variations — below CTAs per design spec */}
        {product.variations && product.variations.length > 0 && (
          <div className="px-4 mt-3">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-4">
              {product.variations.map((variation) => (
                <VariationSelector
                  key={variation.id}
                  variation={variation}
                  selected={mobileSelected[variation.id] ?? null}
                  onChange={(value) => handleMobileSelect(variation.id, value)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Collapsible Listing Details Accordion */}
        <div className="px-4 mt-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setListingOpen(!listingOpen)}
              className="w-full px-4 py-3.5 flex items-center justify-between text-sm font-bold text-gray-900 hover:bg-gray-50/50 cursor-pointer transition-colors"
            >
              <span>Listing Details</span>
              {listingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {listingOpen && (
              <div className="px-4 pb-4 border-t border-gray-50 pt-2 space-y-2">
                <QuickFactRow label="Available stock:" value={availableStock} />
                <QuickFactRow label="Guarantee:" value={<span className="font-semibold underline decoration-dotted">{guarantee}</span>} />
                <QuickFactRow
                  label="Location:"
                  value={
                    <span className="inline-flex items-center gap-1">
                      {location} <span>{seller.countryFlag}</span>
                    </span>
                  }
                />
                <QuickFactRow label="Handling Time:" value={handlingTime} />
                <QuickFactRow label="Returns:" value={<span className="font-semibold underline decoration-dotted">{returns}</span>} />
                <QuickFactRow label="Condition:" value={condition} />
                
                {/* Social Share row inside Mobile accordion */}
                <div className="flex items-center justify-between py-1.5 text-sm">
                  <span className="text-gray-500 font-medium">Share:</span>
                  <div className="flex items-center gap-1.5">
                    <a href="#" className="flex h-5 w-5 items-center justify-center rounded bg-[#3b5998] text-white hover:opacity-90">
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-4 1.5-4 4v2z"/>
                      </svg>
                    </a>
                    <a href="#" className="flex h-5 w-5 items-center justify-center rounded bg-[#1da1f2] text-white hover:opacity-90">
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M24 4.56a9.83 9.83 0 0 1-2.83.77 4.93 4.93 0 0 0 2.17-2.72 9.8 9.8 0 0 1-3.12 1.19 4.92 4.92 0 0 0-8.38 4.48A13.97 13.97 0 0 1 1.64 3.16a4.92 4.92 0 0 0 1.52 6.57 4.9 4.9 0 0 1-2.23-.62v.06a4.92 4.92 0 0 0 3.95 4.82 4.9 4.9 0 0 1-2.22.08 4.92 4.92 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 19.54a13.94 13.94 0 0 0 7.55 2.21c9.06 0 14-7.5 14-14 0-.21 0-.42-.01-.63A10 10 0 0 0 24 4.56z"/>
                      </svg>
                    </a>
                    <a href="#" className="flex h-5 w-5 items-center justify-center rounded bg-[#bd081c] text-white hover:opacity-90">
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.4 7.63 11.16-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.36-.72-.36-1.77c0-1.66.96-2.9 2.17-2.9 1.02 0 1.51.77 1.51 1.69 0 1.03-.65 2.56-.99 3.98-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86-3.4 0-5.4 2.56-5.4 5.2 0 1.03.4 2.14.9 2.74.1.12.11.23.08.35l-.34 1.37c-.06.22-.18.27-.4.17-1.5-.7-2.44-2.88-2.44-4.64 0-3.78 2.75-7.25 7.9-7.25 4.15 0 7.38 2.96 7.38 6.9 0 4.13-2.6 7.45-6.2 7.45-1.2 0-2.35-.63-2.74-1.37l-.75 2.85c-.27 1.04-1 2.35-1.5 3.1 1.12.35 2.3.54 3.53.54 6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                      </svg>
                    </a>
                    <a href="#" className="flex h-5 w-5 items-center justify-center rounded bg-[#ff4500] text-white hover:opacity-90">
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.27-1.72l1.3-4.1 4.2.9c.04.94.8 1.68 1.74 1.68 1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8c-.85 0-1.57.58-1.74 1.38L13 1.88a.75.75 0 0 0-.9-.5L10.74 5c-2.45.06-4.7.7-6.38 1.73A3.82 3.82 0 0 0 2 8.5c0 1.65 1.35 3 3 3 .15 0 .3-.02.45-.05C5.16 12.56 5 13.78 5 15c0 3.86 4.03 7 9 7s9-3.14 9-7c0-1.22-.16-2.44-.45-3.55.15.03.3.05.45.05zm-18.22-.72a1.76 1.76 0 0 1 .44-1.12 11.83 11.83 0 0 1 2.3-1c.45-.14.93-.24 1.4-.3L8.6 12.35a1.74 1.74 0 0 1-2.82-1.57zm12.44 5.72c-1.18 1.18-3.4 1.28-4.22 1.28-.83 0-3.04-.1-4.22-1.28a.75.75 0 1 1 1.06-1.06c.72.72 2.25.9 3.16.9.9 0 2.44-.18 3.16-.9a.75.75 0 1 1 1.06 1.06zm-.32-3.8a1.75 1.75 0 0 1-.95 2.14 1.74 1.74 0 0 1-2.3-1c.47.06.95.16 1.4.3a11.83 11.83 0 0 1 2.3 1c.07-.15.11-.3.1-.47z"/>
                      </svg>
                    </a>
                    <a href="#" className="flex h-5 w-5 items-center justify-center rounded bg-[#007bff] text-white hover:opacity-90">
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Item Specifications Accordion */}
        <div className="px-4 mt-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setSpecsOpen(!specsOpen)}
              className="w-full px-4 py-3.5 flex items-center justify-between text-sm font-bold text-gray-900 hover:bg-gray-50/50 cursor-pointer transition-colors"
            >
              <span>Item Specifications</span>
              {specsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {specsOpen && (
              <div className="px-4 pb-4 border-t border-gray-50 pt-3">
                <dl className="grid grid-cols-1 gap-y-1 text-sm">
                  {visibleSpecsEntries.map(([label, value]) => (
                    <div key={label} className="flex justify-between py-1.5">
                      <dt className="text-gray-900 font-semibold">{label}</dt>
                      <dd className="text-right font-medium text-gray-700">{value}</dd>
                    </div>
                  ))}
                </dl>

                {hasMoreSpecs && (
                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setSpecsExpanded(!specsExpanded)}
                      className="flex items-center gap-1 rounded-full border border-gray-200 px-4 py-1.5 text-xs font-bold text-[#04352A] hover:text-[#032820] cursor-pointer transition-colors"
                    >
                      {specsExpanded ? "View Less" : "Click to see more"}
                      {specsExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Product Description Accordion */}
        <div className="px-4 mt-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setDescriptionOpen(!descriptionOpen)}
              className="w-full px-4 py-3.5 flex items-center justify-between text-sm font-bold text-gray-900 hover:bg-gray-50/50 cursor-pointer transition-colors"
            >
              <span>Product Description</span>
              {descriptionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {descriptionOpen && (
              <div className="px-4 pb-4 border-t border-gray-50 pt-3 text-sm text-gray-600 font-semibold leading-relaxed">
                {product.description}
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Seller Information Accordion */}
        <div className="px-4 mt-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Seller Header */}
            <button
              type="button"
              className="w-full px-4 py-3.5 flex items-center justify-between text-sm font-bold text-gray-900 hover:bg-gray-50/50 cursor-pointer transition-colors"
            >
              <span>Seller Information</span>
              <ChevronUp size={16} />
            </button>

            <div className="px-4 pb-4 border-t border-gray-50 pt-4 flex flex-col gap-5">
              {/* Profile details */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 rounded-full border border-gray-200 overflow-hidden shadow-sm">
                  <img
                    src={product.images[0]?.src || "https://i.ebayimg.com/images/g/Z3IAAeSw2MZoeTlo/s-l1000.jpg"}
                    alt={seller.username}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-bold text-gray-900">{seller.username}</span>
                    {seller.verified && (
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1DA1F2] text-white">
                        <Check size={8} strokeWidth={4} />
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-1.5 text-xs text-gray-600">
                    <div className="flex items-center text-[#F5A623]">
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                    </div>
                    <span className="font-semibold text-gray-800">{seller.rating.toFixed(1)} Seller Rating</span>
                    <span className="text-gray-300">|</span>
                    <a href="#" className="underline hover:text-emerald-800 font-medium">
                      {seller.feedbackCount} Feedback
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold mt-0.5">
                    <span>{seller.location}</span>
                    <span>{seller.countryFlag}</span>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
                {/* Current Listings */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <div className="text-base font-bold text-gray-900">
                      {seller.currentListings.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 leading-tight">Current Listings</div>
                  </div>
                </div>

                {/* Items Sold */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                    <Box size={18} />
                  </div>
                  <div>
                    <div className="text-base font-bold text-gray-900">{seller.itemsSold}</div>
                    <div className="text-[10px] font-bold text-gray-400 leading-tight">Items Sold</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center border-t border-gray-50 pt-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 w-full rounded-lg border border-emerald-800 py-2.5 text-xs font-bold text-emerald-800 bg-white transition-colors hover:bg-emerald-50 cursor-pointer"
                >
                  <Store size={14} />
                  <span>View Seller Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Advertisement below Seller Info */}
        <div className="px-4">
          <Advertisement />
        </div>

        {/* Sticky Buy Now floating bottom bar */}
        <MobileStickyBuyNow onBuyNow={onBuyNow} />
        <MobileBottomNav />

        {/* Add to Cart Bottom Sheet */}
        <MobileAddToCartSheet
          isOpen={cartSheetOpen}
          onClose={() => setCartSheetOpen(false)}
          onViewCart={() => { setCartSheetOpen(false); onAddToCart?.(); }}
        />
      </div>

      {/* ---------------- DESKTOP / TABLET VIEW (hidden md:block) ---------------- */}
      <div className="hidden md:block">
        <Breadcrumb />
        <TrustBar />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[58%_1fr]">
            {/* Left Column: Gallery only */}
            <div className="self-start">
              <ProductGallery />
            </div>

            {/* Right Column: action panel — self-start so its content height sets the grid row height */}
            <div className="border border-gray-250 rounded-xl p-3 bg-white shadow-sm flex flex-col gap-2 self-start">
              <ProductInfo />
              <CTASection onBuyNow={onBuyNow} onAddToCart={onAddToCart} />
            </div>
          </div>

          {/* Product Description */}
          <section className="mt-6 rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
            <h2 className="text-base font-semibold text-gray-900 sm:text-lg">Product Description</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
              {product.description}
            </p>
          </section>

          <ItemSpecifications />

          <SellerInfo />

          {/* Sponsored Advertisement Section */}
          <Advertisement />
        </div>
      </div>
    </>
  );
}

export default ListingDetailsPage;
