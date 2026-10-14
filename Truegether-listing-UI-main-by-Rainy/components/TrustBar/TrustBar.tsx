import { ShieldCheck, Star, RotateCcw } from "lucide-react";
import { product } from "@/data/listing";
import TrustBarItem from "./TrustBarItem";

function TrustBar() {
  const { trustBar } = product;

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <TrustBarItem
          icon={<ShieldCheck size={16} className="text-[#1f4d38]" />}
          label={trustBar.guaranteeText}
        />
        <TrustBarItem
          icon={<Star size={16} className="text-[#f59e0b]" />}
          label={`${trustBar.rating.toFixed(1)} (${trustBar.reviewCount} reviews)`}
        />
        <TrustBarItem
          icon={<RotateCcw size={16} className="text-[#1f4d38]" />}
          label={trustBar.returnsAccepted ? "Returns accepted" : "Returns not accepted"}
        />
      </div>
    </section>
  );
}

export default TrustBar;
