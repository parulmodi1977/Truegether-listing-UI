import { useState } from "react";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import { product } from "@/data/listing";

const COUNTRIES = [
  "United States", "United Kingdom", "Australia", "Canada", "Germany",
  "France", "India", "Japan", "China", "Brazil", "Mexico", "Italy",
  "Spain", "Netherlands", "South Korea", "Singapore", "New Zealand",
  "Ireland", "Austria", "Belgium", "Denmark", "Finland", "Greece",
  "Hungary", "Norway", "Poland", "Portugal", "Sweden", "Switzerland",
  "Argentina", "Chile", "Colombia", "Egypt", "Israel", "Malaysia",
  "Pakistan", "Philippines", "Saudi Arabia", "South Africa", "Thailand",
  "Turkey", "United Arab Emirates", "Vietnam",
];

const SHIPPING_SERVICES = [
  { service: "Free Economy Shipping", cost: "$0.00", each: "$0.00" },
  { service: "Others (See Listing Description)", cost: "$0.00", each: "$0.00" },
];

const PAYPAL_SVG = (
  <svg className="h-4 w-auto" viewBox="0 0 101 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.237 2.869H5.992c-.428 0-.793.312-.86.736L2.698 19.848a.516.516 0 0 0 .51.595h3.004c.428 0 .793-.312.86-.736l.71-4.508a.872.872 0 0 1 .86-.736h2.153c4.484 0 7.073-2.17 7.753-6.472.305-1.88.013-3.356-.87-4.392-.97-1.136-2.69-1.73-4.44-1.73z" fill="#003087"/>
    <path d="M13.151 9.222c-.372 2.436-2.238 2.436-4.044 2.436h-1.027l.721-4.563a.523.523 0 0 1 .516-.441h.471c1.229 0 2.39 0 2.99.7.358.42.466 1.043.373 1.868z" fill="#009cde"/>
    <path d="M32.052 9.132h-3.018a.523.523 0 0 0-.516.441l-.133.843-.21-.305c-.653-.948-2.108-1.265-3.561-1.265-3.332 0-6.18 2.524-6.733 6.064-.288 1.766.121 3.452 1.124 4.628.921 1.083 2.237 1.533 3.803 1.533 2.685 0 4.177-1.726 4.177-1.726l-.135.838a.516.516 0 0 0 .51.596h2.719c.428 0 .792-.312.86-.736l1.632-10.335a.516.516 0 0 0-.519-.576zm-4.208 5.862c-.291 1.722-1.657 2.878-3.401 2.878-.876 0-1.577-.281-2.027-.813-.447-.529-.615-1.283-.474-2.121.272-1.707 1.66-2.9 3.379-2.9.857 0 1.554.284 2.013.821.462.542.641 1.3.51 2.135z" fill="#003087"/>
    <path d="M53.345 9.132h-3.033c-.19 0-.369.094-.477.25l-2.754 4.054-1.168-3.896a.874.874 0 0 0-.838-.627h-2.98a.516.516 0 0 0-.49.683l2.2 6.456-2.069 2.92a.516.516 0 0 0 .422.815h3.03c.188 0 .366-.092.474-.247l6.643-9.588a.516.516 0 0 0-.42-.82h-.54z" fill="#003087"/>
    <path d="M63.593 9.132h-3.018a.523.523 0 0 0-.516.441l-.133.843-.21-.305c-.653-.948-2.108-1.265-3.561-1.265-3.332 0-6.18 2.524-6.733 6.064-.288 1.766.121 3.452 1.124 4.628.921 1.083 2.237 1.533 3.803 1.533 2.685 0 4.177-1.726 4.177-1.726l-.135.838a.516.516 0 0 0 .51.596h2.719c.428 0 .792-.312.86-.736l1.632-10.335a.516.516 0 0 0-.519-.576zm-4.208 5.862c-.291 1.722-1.657 2.878-3.401 2.878-.876 0-1.577-.281-2.027-.813-.447-.529-.615-1.283-.474-2.121.272-1.707 1.66-2.9 3.379-2.9.857 0 1.554.284 2.013.821.462.542.641 1.3.51 2.135z" fill="#009cde"/>
    <path d="M67.44 3.356l-2.581 16.492a.516.516 0 0 0 .51.596h2.6a.872.872 0 0 0 .86-.736l2.545-16.129a.516.516 0 0 0-.51-.595h-2.914a.516.516 0 0 0-.51.372z" fill="#009cde"/>
  </svg>
);

interface ReviewPurchasePageProps {
  onBack?: () => void;
  onOrderPlaced?: () => void;
}

function ReviewPurchasePage({ onBack, onOrderPlaced }: ReviewPurchasePageProps) {
  const [quantity, setQuantity] = useState(1);
  const [country, setCountry] = useState("United States");
  const [selectedShipping, setSelectedShipping] = useState(0);
  const [message, setMessage] = useState("");

  const shippingCost = parseFloat(SHIPPING_SERVICES[selectedShipping].cost.replace("$", "")) || 0;
  const itemCost = product.price * quantity;
  const orderTotal = itemCost + shippingCost;
  const savings = product.oldPrice ? (product.oldPrice - product.price) * quantity : 0;
  const mainImage = product.images[0];

  const cardCls = "rounded-xl border border-gray-100 bg-white shadow-sm p-3 md:p-3";
  const headingCls = "text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 pb-1.5 border-b border-gray-100";
  const labelCls = "text-[10px] font-medium text-gray-400 uppercase tracking-wide";
  const valueCls = "text-xs text-gray-700 font-medium";
  const selectCls = "w-full rounded-md border border-gray-300 px-2 py-1.5 md:py-1 text-xs font-medium text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#04352A] focus:border-[#04352A] cursor-pointer";

  const orderSummaryCard = (
    <div className={cardCls}>
      <h2 className={headingCls}>Order Summary</h2>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Item Cost</span>
          <span className="font-semibold text-gray-800">${itemCost.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Shipping</span>
          <span className="font-semibold text-emerald-700">
            {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>
        <div className="border-t border-gray-100 pt-1.5 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-900">Order Total</span>
          <span className="text-sm font-bold text-gray-900">${orderTotal.toFixed(2)}</span>
        </div>
        {savings > 0 && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Your Savings</span>
            <span className="font-semibold text-emerald-700">${savings.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );

  const paymentCard = (
    <div className={cardCls}>
      <h2 className={headingCls}>Payment Method</h2>

      <button
        type="button"
        onClick={onOrderPlaced}
        className="w-full h-9 md:h-8 rounded-md bg-[#FFC439] hover:bg-[#f0b429] transition-colors flex items-center justify-center gap-1.5 font-bold text-[#003087] text-xs cursor-pointer"
      >
        {PAYPAL_SVG}
        <span>Pay with PayPal</span>
      </button>

      <div className="flex items-center gap-2 my-2">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-[10px] text-gray-400 font-medium">or</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      <button
        type="button"
        onClick={onOrderPlaced}
        className="w-full h-9 md:h-8 rounded-md bg-[#04352A] hover:bg-[#032820] transition-colors flex items-center justify-center gap-1.5 text-white font-semibold text-xs cursor-pointer"
      >
        <Lock size={12} />
        <span>Pay with Debit or Credit Card</span>
      </button>

      <p className="text-center text-[10px] text-gray-400 mt-1.5">
        Local taxes included (where applicable)
      </p>

      <div className="flex items-center justify-center gap-1 mt-2 text-[10px] text-gray-400">
        <ShieldCheck size={11} className="text-emerald-700 shrink-0" />
        <span>Secured by PayPal Buyer Protection</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">

        {/* Back link */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#04352A] transition-colors mb-2"
        >
          <ArrowLeft size={12} />
          <span>Back to listing</span>
        </button>

        {/* Page heading */}
        <h1 className="text-sm font-bold text-gray-900 mb-3">
          Please verify item details before proceeding.
        </h1>

        {/* ── MOBILE ONLY: Order Summary + Payment pinned above details ── */}
        <div className="flex flex-col gap-3 mb-3 md:hidden">
          {orderSummaryCard}
          {paymentCard}
        </div>

        {/* ── MAIN GRID: 1-col mobile → 2-col tablet+ ── */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_272px] lg:grid-cols-[1fr_288px]">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-3">

            {/* Product Details Card */}
            <div className={cardCls}>
              <h2 className={headingCls}>Item Details</h2>

              {/* Product row */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onBack}
                  className="shrink-0 w-16 h-16 md:w-14 md:h-14 rounded-lg border border-gray-200 overflow-hidden bg-white cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img src={mainImage.src} alt={mainImage.alt} className="w-full h-full object-contain" />
                </button>
                <div className="flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-xs font-semibold text-[#04352A] leading-snug line-clamp-2 text-left hover:underline cursor-pointer"
                  >
                    {product.title}
                  </button>
                  <div className="flex flex-wrap items-baseline gap-1.5 mt-1">
                    <span className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="text-[10px] text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                    )}
                    {product.discountPercent && (
                      <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-1 py-0.5 rounded">
                        {product.discountPercent}% off
                      </span>
                    )}
                    {savings > 0 && (
                      <span className="text-[10px] text-emerald-700 font-medium">Save ${savings.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Qty + Seller */}
              <div className="border-t border-gray-100 mt-2.5 pt-2.5 grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-0.5">
                  <label className={labelCls}>Quantity</label>
                  <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className={selectCls}>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className={labelCls}>Seller</span>
                  <span className="text-xs font-semibold text-[#04352A] underline cursor-pointer">
                    {product.seller.username}
                  </span>
                </div>
              </div>

              {/* Variations summary */}
              {product.variations && product.variations.length > 0 && (
                <div className="border-t border-gray-100 mt-2 pt-2 flex flex-wrap gap-x-3 gap-y-1">
                  {product.variations.map((v) => (
                    <div key={v.id} className="flex items-center gap-1 text-xs">
                      <span className="text-gray-400">{v.label}:</span>
                      <span className="text-gray-700 font-medium">{v.options[0].label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Item facts — 2-col on mobile, 4-col on md+ */}
              <div className="border-t border-gray-100 mt-2 pt-2 grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-2">
                {[
                  { label: "Condition", value: product.condition },
                  { label: "Location", value: product.location },
                  { label: "Handling", value: product.handlingTime },
                  { label: "Returns", value: product.returns },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className={labelCls}>{label}</span>
                    <span className={valueCls}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Card */}
            <div className={cardCls}>
              <h2 className={headingCls}>Shipping</h2>
              <div className="mb-2">
                <label className={`${labelCls} block mb-0.5`}>Ship to</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className={selectCls}>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="rounded-lg border border-gray-100 overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-2.5 py-1.5 text-gray-400 font-semibold">Service</th>
                      <th className="text-right px-2.5 py-1.5 text-gray-400 font-semibold">Cost</th>
                      <th className="text-right px-2.5 py-1.5 text-gray-400 font-semibold whitespace-nowrap">Each add'l</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SHIPPING_SERVICES.map((row, i) => (
                      <tr
                        key={i}
                        onClick={() => setSelectedShipping(i)}
                        className={`cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                          selectedShipping === i ? "bg-emerald-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-2.5 py-2">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2.5 h-2.5 rounded-full border-2 shrink-0 ${
                              selectedShipping === i ? "border-[#04352A] bg-[#04352A]" : "border-gray-300"
                            }`} />
                            <span className={`font-medium ${selectedShipping === i ? "text-[#04352A]" : "text-gray-700"}`}>
                              {row.service}
                            </span>
                          </div>
                        </td>
                        <td className="px-2.5 py-2 text-right font-semibold text-gray-700">{row.cost}</td>
                        <td className="px-2.5 py-2 text-right text-gray-500">{row.each}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Message to Seller */}
            <div className={cardCls}>
              <h2 className={headingCls}>Message to Seller</h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                placeholder="Add a note for the seller (optional)..."
                className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-xs text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-[#04352A] focus:border-[#04352A]"
              />
            </div>
          </div>

          {/* ── RIGHT COLUMN — tablet+ only (hidden on mobile, shown above) ── */}
          <div className="hidden md:flex flex-col gap-3 md:sticky md:top-4 md:self-start">
            {orderSummaryCard}
            {paymentCard}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewPurchasePage;
