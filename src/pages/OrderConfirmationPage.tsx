import { CheckCircle, Package, MapPin, CreditCard, MessageSquare, Hash } from "lucide-react";
import { product } from "@/data/listing";

const ORDER = {
  id: "403-8F15FAC2-46D7",
  uniqueId: "B0DYK73JQH",
  date: "October 27, 2026",
  itemCost: product.price,
  shipping: 0,
  salesTax: parseFloat((product.price * 0.04).toFixed(2)),
  get total() { return +(this.itemCost + this.shipping + this.salesTax).toFixed(2); },
  shippingService: "UPS / FedEx / USPS — 2 to 11 business days",
  paymentMethod: "Debit / Credit Card",
  address: {
    name: "John Doe",
    street: "9725 Mountain Rd",
    city: "Grantville",
    state: "PA",
    zip: "17028",
    country: "United States",
  },
};

function OrderConfirmationPage() {
  const mainImage = product.images[0];

  return (
    <div className="bg-gray-50">

      {/* ── HERO ── */}
      <div className="bg-[#04352A] px-4 py-4">
        <div className="max-w-[960px] mx-auto flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/20">
            <CheckCircle size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold text-white">Order Confirmed!</h1>
            <p className="text-xs text-white/60 mt-0.5">A confirmation has been sent to your email.</p>
            <p className="sm:hidden text-[10px] text-white/40 mt-0.5 font-mono tracking-wide">
              {ORDER.date} · {ORDER.id}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-white/50 shrink-0">
            <span>{ORDER.date}</span>
            <span className="text-white/20">|</span>
            <span className="font-mono font-bold text-white/70 tracking-wider">{ORDER.id}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-4 sm:px-6 flex flex-col gap-4 pb-6 mt-4">

        {/* ── 3-COLUMN CARD ── */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">

            {/* Ship To */}
            <div className="p-4 sm:p-6">
              <p className="text-xs font-bold text-gray-900 mb-3">Ship to</p>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#04352A] mt-0.5 shrink-0" />
                <div className="text-sm leading-6 text-gray-600">
                  <p className="font-semibold text-gray-900">{ORDER.address.name}</p>
                  <p>{ORDER.address.street}</p>
                  <p>{ORDER.address.city}, {ORDER.address.state} {ORDER.address.zip}</p>
                  <p>{ORDER.address.country}</p>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-2">
                <Package size={11} className="text-gray-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-gray-400 leading-4">{ORDER.shippingService}</p>
              </div>
            </div>

            {/* Payment */}
            <div className="p-4 sm:p-6">
              <p className="text-xs font-bold text-gray-900 mb-3">Payment method</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 shrink-0">
                  <CreditCard size={18} className="text-emerald-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{ORDER.paymentMethod}</p>
                  <span className="inline-flex items-center gap-1 mt-0.5 text-[11px] font-semibold text-emerald-600">
                    <CheckCircle size={10} />
                    Payment Confirmed
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                <Hash size={12} className="text-gray-300 shrink-0" />
                <span className="text-[11px] text-gray-400">Unique ID</span>
                <span className="text-[11px] font-bold text-gray-600 font-mono tracking-widest">{ORDER.uniqueId}</span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-4 sm:p-6">
              <p className="text-xs font-bold text-gray-900 mb-3">Order summary</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Item(s) Subtotal</span>
                  <span className="text-gray-800">${ORDER.itemCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sales Tax</span>
                  <span className="text-gray-800">${ORDER.salesTax.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-900">Grand Total</span>
                <span className="text-xl font-bold text-[#04352A]">${ORDER.total.toFixed(2)}</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── ITEM CARD ── */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">

          <div className="p-4 sm:p-6 flex gap-3 sm:gap-6">

            {/* Product image */}
            <div className="shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded-xl border border-gray-100 bg-gray-50 overflow-hidden p-1.5 sm:p-2">
              <img src={mainImage.src} alt={mainImage.alt} className="w-full h-full object-contain" />
            </div>

            {/* Product info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{product.title}</p>
              <p className="text-xs text-gray-400 mt-1">
                Sold by{" "}
                <span className="text-[#04352A] font-semibold cursor-pointer hover:underline">{product.seller.username}</span>
              </p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                )}
                {product.discountPercent && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                    {product.discountPercent}% off
                  </span>
                )}
              </div>
              {product.variations && product.variations.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {product.variations.map((v) => (
                    <span key={v.id} className="text-[11px] text-gray-500 bg-gray-100 rounded-md px-2 py-0.5">
                      {v.label}: <span className="font-semibold text-gray-700">{v.options[0].label}</span>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2">
                {[
                  { label: "Condition", value: product.condition },
                  { label: "Returns",   value: product.returns },
                  { label: "Handling",  value: product.handlingTime },
                ].map(({ label, value }) => (
                  <span key={label} className="text-[11px] text-gray-500">
                    {label}: <span className="font-semibold text-gray-700">{value}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Seller — desktop */}
            <div className="shrink-0 hidden sm:flex flex-col w-44">
              <button
                type="button"
                className="h-10 rounded-full bg-[#04352A] text-xs font-bold text-white hover:bg-[#032820] transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <MessageSquare size={13} />
                Contact Seller
              </button>
            </div>
          </div>

          {/* Contact Seller — mobile */}
          <div className="sm:hidden px-4 pb-4">
            <button type="button" className="w-full h-10 rounded-full bg-[#04352A] text-xs font-bold text-white cursor-pointer flex items-center justify-center gap-2">
              <MessageSquare size={13} /> Contact Seller
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default OrderConfirmationPage;
