import { RotateCcw, MessageCircle, Star, ShieldCheck } from "lucide-react";
import TrustBarItem from "./TrustBarItem";
import { product } from "@/data/listing";
import type { TrustBarInfo } from "@/types/product.types";

interface TrustBarProps {
  trust?: TrustBarInfo;
}

function TrustBar({ trust = product.trustBar }: TrustBarProps) {
  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-3 divide-x divide-gray-200 overflow-x-auto">
          <TrustBarItem icon={<RotateCcw size={13} className="text-[#04352A]" />}>
            {trust.returnsAccepted ? "Returns Accepted" : "No Returns"}
          </TrustBarItem>

          <TrustBarItem className="pl-3" icon={<MessageCircle size={13} className="text-gray-500" />}>
            {trust.reviewCount.toLocaleString()} Reviews from Buyers
          </TrustBarItem>

          <TrustBarItem className="pl-3" icon={<Star size={13} className="text-[#F5A623] fill-[#F5A623]" />}>
            <span className="font-medium text-gray-700">{trust.rating.toFixed(1)}</span>{" "}
            Ratings
          </TrustBarItem>

          <TrustBarItem className="pl-3" icon={<ShieldCheck size={13} className="text-[#04352A]" />}>
            {trust.guaranteeText}
          </TrustBarItem>
        </div>
      </div>
    </div>
  );
}

export default TrustBar;
