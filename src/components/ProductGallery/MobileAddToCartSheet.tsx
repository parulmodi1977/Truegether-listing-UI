import { useEffect } from "react";
import { Check, ShoppingCart, X } from "lucide-react";
import { product } from "@/data/listing";

interface MobileAddToCartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onViewCart: () => void;
  quantity?: number;
}

// Simulated existing cart count for subtotal display
const EXISTING_CART_ITEMS = 1;
const EXISTING_CART_PRICE = product.price;

function MobileAddToCartSheet({
  isOpen,
  onClose,
  onViewCart,
  quantity = 1,
}: MobileAddToCartSheetProps) {
  const { title, price, images } = product;
  const totalItems = EXISTING_CART_ITEMS + quantity;
  const subtotal = EXISTING_CART_PRICE + price * quantity;

  // Prevent background scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[998] bg-black/40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[999] bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-gray-200" />
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X size={18} className="text-gray-500" />
        </button>

        <div className="px-5 pb-8 pt-2 flex flex-col gap-5">
          {/* Success Header */}
          <div className="flex flex-col items-center gap-2 pt-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#04352A]">
              <Check size={20} className="text-white" strokeWidth={3} />
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-gray-900">Added to Cart!</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                {quantity} item{quantity > 1 ? "s" : ""} has been added to your cart
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* Product Summary */}
          <div className="flex items-center gap-3">
            <div className="h-[60px] w-[60px] shrink-0 rounded-xl border border-gray-100 bg-gray-50 overflow-hidden flex items-center justify-center p-1">
              <img
                src={images[0]?.src}
                alt={title}
                className="h-full w-full object-contain mix-blend-multiply"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                {title}
              </p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Lamp</p>
              <p className="text-sm font-bold text-gray-900 mt-1">${price.toFixed(2)}</p>
            </div>
            <div className="shrink-0 text-xs font-semibold text-gray-500 bg-gray-100 rounded-md px-2 py-1">
              Qty: {quantity}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* Cart Subtotal */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              Cart Subtotal ({totalItems} item{totalItems > 1 ? "s" : ""})
            </span>
            <span className="text-sm font-bold text-gray-900">${subtotal.toFixed(2)}</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-12 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-800 transition-colors hover:bg-gray-50 active:scale-[0.98] cursor-pointer"
            >
              Continue Shopping
            </button>
            <button
              type="button"
              onClick={onViewCart}
              className="h-12 rounded-xl bg-[#04352A] text-sm font-bold text-white transition-all hover:bg-[#032820] active:scale-[0.98] shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingCart size={15} />
              View Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileAddToCartSheet;
