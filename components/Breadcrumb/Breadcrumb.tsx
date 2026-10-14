import { ChevronRight } from "lucide-react";
import { product } from "@/data/listing";

function Breadcrumb({ items = product.breadcrumb }) {
  const lastIndex = items.length - 1;

  return (
    <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-100">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-gray-500">
          {items.map((item: { label: string; href: string }, index: number) => {
            const isLast = index === lastIndex;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {isLast ? (
                  <span className="text-gray-700 font-medium">{item.label}</span>
                ) : (
                  <a href={item.href} className="hover:text-[#04352A] hover:underline transition-colors">
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