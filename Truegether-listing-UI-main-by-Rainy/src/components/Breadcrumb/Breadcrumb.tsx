import { ChevronRight } from "lucide-react";
import { product } from "@/data/listing";
import type { BreadcrumbItem } from "@/types/product.types";

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

function Breadcrumb({ items = product.breadcrumb }: BreadcrumbProps) {
  const lastIndex = items.length - 1;

  return (
    <nav aria-label="Breadcrumb" className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-3 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
          {items.map((item, index) => {
            const isLast = index === lastIndex;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {isLast ? (
                  <span className="font-medium text-gray-700">{item.label}</span>
                ) : (
                  <a href={item.href} className="transition-colors hover:text-[#04352A] hover:underline">
                    {item.label}
                  </a>
                )}
                {!isLast && <ChevronRight size={14} className="text-gray-400" />}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

export default Breadcrumb;
