import { useEffect, useState } from "react";
import { product } from "@/data/listing";

interface MobileStickyBuyNowProps {
  onBuyNow?: () => void;
}

function MobileStickyBuyNow({ onBuyNow }: MobileStickyBuyNowProps) {
  const { price, oldPrice, discountPercent, priceApproxLabel } = product;
  const [hidden, setHidden] = useState(false);

  // Hide when the page footer scrolls into view
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed bottom-14 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between gap-3 md:hidden">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-gray-900">${price.toFixed(2)}</span>
          {discountPercent && (
            <span className="border border-red-500 text-red-500 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-red-50/10">
              {discountPercent}% OFF
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5 font-semibold">
          {oldPrice && <span className="line-through">${oldPrice.toFixed(2)}</span>}
          <span>[~ {priceApproxLabel}]</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onBuyNow}
        className="w-[140px] h-[44px] rounded-lg bg-[#04352A] text-sm font-bold text-white transition-all hover:bg-[#032820] active:scale-[0.98] cursor-pointer"
      >
        Buy Now
      </button>
    </div>
  );
}

export default MobileStickyBuyNow;
