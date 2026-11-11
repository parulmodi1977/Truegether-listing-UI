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
          className="h-8 w-full rounded-md bg-[#10887a] text-xs font-semibold text-white transition-colors hover:bg-[#0d7368] cursor-pointer"
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
        
      </div>

    </div>
  );
}

export default CTASection;