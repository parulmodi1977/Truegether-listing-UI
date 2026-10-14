import { HelpCircle } from "lucide-react";
import { product } from "@/data/listing";
import QuickFactRow from "./QuickFactRow";

interface CTASectionProps {
  onBuyNow?: () => void;
  onMakeOffer?: () => void;
  onAddToCart?: () => void;
  onAskQuestion?: () => void;
}

function CTASection({ onBuyNow, onMakeOffer, onAddToCart, onAskQuestion }: CTASectionProps) {
  const { availableStock, guarantee, location, handlingTime, returns, condition, seller } = product;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          onClick={onBuyNow}
          className="h-8 w-full rounded-md bg-[#04352A] text-xs font-semibold text-white transition-colors hover:bg-[#032820] cursor-pointer"
        >
          Buy Now
        </button>

        <button
          type="button"
          onClick={onMakeOffer}
          className="h-8 w-full rounded-md border border-[#04352A] bg-white text-xs font-semibold text-[#04352A] transition-colors hover:bg-[#04352A]/5 cursor-pointer"
        >
          Make Offer
        </button>

        <button
          type="button"
          onClick={onAddToCart}
          className="h-8 w-full rounded-md border border-[#04352A] bg-white text-xs font-semibold text-[#04352A] transition-colors hover:bg-[#04352A]/5 cursor-pointer"
        >
          Add To Cart
        </button>

        <button
          type="button"
          onClick={onAskQuestion}
          className="flex h-8 items-center justify-center gap-1.5 w-full rounded-md border border-emerald-800 bg-white text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-50 cursor-pointer"
        >
          <HelpCircle size={14} />
          <span>Ask a question</span>
        </button>
      </div>

      <div className="mt-2 border-t border-gray-100 pt-2 space-y-0">
        <QuickFactRow label="Available stock:" value={availableStock} />
        <QuickFactRow label="Guarantee:" value={<span className="font-medium underline decoration-dotted cursor-pointer">{guarantee}</span>} />
        <QuickFactRow
          label="Location:"
          value={
            <span className="inline-flex items-center gap-1">
              {location} <span>{seller.countryFlag}</span>
            </span>
          }
        />
        <QuickFactRow label="Handling Time:" value={handlingTime} />
        <QuickFactRow label="Returns:" value={<span className="font-medium underline decoration-dotted cursor-pointer">{returns}</span>} />
        <QuickFactRow label="Condition:" value={condition} />
        
        {/* Social Share Row */}
        <div className="flex items-center justify-between py-0.5 text-xs">
          <span className="text-gray-500">Share:</span>
          <div className="flex items-center gap-1.5">
            {/* Facebook */}
            <a href="#" className="flex h-5 w-5 items-center justify-center rounded bg-[#3b5998] text-white hover:opacity-90">
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-4 1.5-4 4v2z"/>
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="#" className="flex h-5 w-5 items-center justify-center rounded bg-[#1da1f2] text-white hover:opacity-90">
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.56a9.83 9.83 0 0 1-2.83.77 4.93 4.93 0 0 0 2.17-2.72 9.8 9.8 0 0 1-3.12 1.19 4.92 4.92 0 0 0-8.38 4.48A13.97 13.97 0 0 1 1.64 3.16a4.92 4.92 0 0 0 1.52 6.57 4.9 4.9 0 0 1-2.23-.62v.06a4.92 4.92 0 0 0 3.95 4.82 4.9 4.9 0 0 1-2.22.08 4.92 4.92 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 19.54a13.94 13.94 0 0 0 7.55 2.21c9.06 0 14-7.5 14-14 0-.21 0-.42-.01-.63A10 10 0 0 0 24 4.56z"/>
              </svg>
            </a>
            {/* Pinterest */}
            <a href="#" className="flex h-5 w-5 items-center justify-center rounded bg-[#bd081c] text-white hover:opacity-90">
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.4 7.63 11.16-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.36-.72-.36-1.77c0-1.66.96-2.9 2.17-2.9 1.02 0 1.51.77 1.51 1.69 0 1.03-.65 2.56-.99 3.98-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86-3.4 0-5.4 2.56-5.4 5.2 0 1.03.4 2.14.9 2.74.1.12.11.23.08.35l-.34 1.37c-.06.22-.18.27-.4.17-1.5-.7-2.44-2.88-2.44-4.64 0-3.78 2.75-7.25 7.9-7.25 4.15 0 7.38 2.96 7.38 6.9 0 4.13-2.6 7.45-6.2 7.45-1.2 0-2.35-.63-2.74-1.37l-.75 2.85c-.27 1.04-1 2.35-1.5 3.1 1.12.35 2.3.54 3.53.54 6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
              </svg>
            </a>
            {/* Reddit */}
            <a href="#" className="flex h-5 w-5 items-center justify-center rounded bg-[#ff4500] text-white hover:opacity-90">
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.27-1.72l1.3-4.1 4.2.9c.04.94.8 1.68 1.74 1.68 1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8c-.85 0-1.57.58-1.74 1.38L13 1.88a.75.75 0 0 0-.9-.5L10.74 5c-2.45.06-4.7.7-6.38 1.73A3.82 3.82 0 0 0 2 8.5c0 1.65 1.35 3 3 3 .15 0 .3-.02.45-.05C5.16 12.56 5 13.78 5 15c0 3.86 4.03 7 9 7s9-3.14 9-7c0-1.22-.16-2.44-.45-3.55.15.03.3.05.45.05zm-18.22-.72a1.76 1.76 0 0 1 .44-1.12 11.83 11.83 0 0 1 2.3-1c.45-.14.93-.24 1.4-.3L8.6 12.35a1.74 1.74 0 0 1-2.82-1.57zm12.44 5.72c-1.18 1.18-3.4 1.28-4.22 1.28-.83 0-3.04-.1-4.22-1.28a.75.75 0 1 1 1.06-1.06c.72.72 2.25.9 3.16.9.9 0 2.44-.18 3.16-.9a.75.75 0 1 1 1.06 1.06zm-.32-3.8a1.75 1.75 0 0 1-.95 2.14 1.74 1.74 0 0 1-2.3-1c.47.06.95.16 1.4.3a11.83 11.83 0 0 1 2.3 1c.07-.15.11-.3.1-.47z"/>
              </svg>
            </a>
            {/* Share/Plus */}
            <a href="#" className="flex h-5 w-5 items-center justify-center rounded bg-[#007bff] text-white hover:opacity-90">
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CTASection;