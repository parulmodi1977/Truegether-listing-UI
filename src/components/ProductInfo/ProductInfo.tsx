import { useState } from "react";
import { Share2, Heart } from "lucide-react";
import { product } from "@/data/listing";
import VariationSelector from "@/components/Variations/VariationSelector";

function ProductInfo() {
  const { title, price, oldPrice, discountPercent, priceApproxLabel, variations } = product;
  const [selected, setSelected] = useState<Record<string, string>>({});

  function handleSelect(variationId: string, value: string) {
    setSelected((prev) => ({ ...prev, [variationId]: value }));
  }

  return (
    <div className="w-full">
      <h1 className="text-sm font-bold leading-snug text-gray-900 sm:text-base">
        {title}
      </h1>

      <div className="mt-2 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-xl font-bold text-gray-900 sm:text-2xl">
            ${price.toFixed(2)}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3 text-xs font-semibold text-gray-500">
          <button
            type="button"
            className="flex items-center gap-1 transition-colors hover:text-gray-700 cursor-pointer"
          >
            <Share2 size={13} />
            <span>Share</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1 transition-colors hover:text-gray-700 cursor-pointer"
          >
            <Heart size={13} />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="mt-0.5 flex items-baseline gap-2">
        {oldPrice !== undefined && (
          <span className="text-xs text-gray-400 line-through">
            ${oldPrice.toFixed(2)}
          </span>
        )}

        {discountPercent !== undefined && (
          <span className="text-xs font-semibold text-red-600 bg-red-55 px-1.5 py-0.5 rounded">
            ({discountPercent}% off)
          </span>
        )}
      </div>

      {priceApproxLabel && (
        <p className="mt-0.5 text-xs text-gray-400 font-medium">[~ {priceApproxLabel}]</p>
      )}

      {variations && variations.length > 0 && (
        <div className="mt-2 flex flex-col gap-2 border-t border-gray-100 pt-2">
          {variations.map((variation) => (
            <VariationSelector
              key={variation.id}
              variation={variation}
              selected={selected[variation.id] ?? null}
              onChange={(value) => handleSelect(variation.id, value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
