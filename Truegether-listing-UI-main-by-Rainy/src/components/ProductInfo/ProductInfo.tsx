import { Share2, Heart } from "lucide-react";
import { product } from "@/data/listing";

function ProductInfo() {
  const { title, price, oldPrice, discountPercent, priceApproxLabel } = product;

  return (
    <div className="w-full">
      <h1 className="text-lg font-bold leading-snug text-gray-900 sm:text-xl">
        {title}
      </h1>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-2xl font-bold text-gray-900 sm:text-3xl">
            ${price.toFixed(2)}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-4 text-xs font-semibold text-gray-500">
          <button
            type="button"
            className="flex items-center gap-1.5 transition-colors hover:text-gray-700 cursor-pointer"
          >
            <Share2 size={15} />
            <span>Share</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 transition-colors hover:text-gray-700 cursor-pointer"
          >
            <Heart size={15} />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="mt-1 flex items-baseline gap-2">
        {oldPrice !== undefined && (
          <span className="text-sm text-gray-400 line-through">
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
        <p className="mt-1 text-xs text-gray-400 font-medium">[~ {priceApproxLabel}]</p>
      )}
    </div>
  );
}

export default ProductInfo;
