import type { ProductVariation } from "@/types/product.types";

interface VariationSelectorProps {
  variation: ProductVariation;
  selected: string | null;
  onChange: (value: string) => void;
  showError?: boolean;
}

function VariationSelector({ variation, selected, onChange, showError }: VariationSelectorProps) {
  const hasError = showError && variation.required && !selected;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1 text-xs font-semibold text-gray-800">
        <span>{variation.label}</span>
        {variation.required && <span className="text-red-500">*</span>}
        {variation.type !== 'dropdown' && selected && (
          <span className="ml-1 font-normal text-gray-500">
            — {variation.options.find((o) => o.value === selected)?.label}
          </span>
        )}
      </div>

      {variation.type === 'dropdown' ? (
        <select
          value={selected ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={[
            "w-full rounded-md border px-2.5 py-1 text-xs font-semibold text-gray-700 bg-white cursor-pointer transition-colors",
            "focus:outline-none focus:ring-1 focus:ring-[#04352A] focus:border-[#04352A]",
            hasError ? "border-red-400" : "border-gray-300 hover:border-[#04352A]",
          ].join(' ')}
        >
          <option value="" disabled>Select {variation.label}</option>
          {variation.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.inStock === false}
            >
              {option.label}{option.inStock === false ? ' (Out of stock)' : ''}
            </option>
          ))}
        </select>
      ) : (
        <div className="flex flex-wrap gap-2">
          {variation.options.map((option) => {
            const isSelected = selected === option.value;
            const isOutOfStock = option.inStock === false;

            return (
              <button
                key={option.value}
                type="button"
                disabled={isOutOfStock}
                onClick={() => !isOutOfStock && onChange(option.value)}
                className={[
                  "rounded-md border px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer",
                  isSelected
                    ? "border-[#04352A] bg-[#04352A] text-white shadow-sm"
                    : isOutOfStock
                    ? "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                    : "border-gray-300 bg-white text-gray-700 hover:border-[#04352A] hover:text-[#04352A]",
                ].join(" ")}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}

      {hasError && (
        <p className="text-xs font-medium text-red-500">
          Please select a {variation.label.toLowerCase()}.
        </p>
      )}
    </div>
  );
}

export default VariationSelector;
