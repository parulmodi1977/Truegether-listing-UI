import { useRef, useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import type { ProductImage } from "@/types/product.types";

interface MobileGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ProductImage[];
  initialIndex?: number;
}

function MobileGalleryModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}: MobileGalleryModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
      setTimeout(() => {
        scrollerRef.current?.scrollTo({
          left: initialIndex * (scrollerRef.current?.clientWidth ?? 0),
          behavior: "instant",
        });
      }, 0);
    }
  }, [isOpen, initialIndex]);

  if (!isOpen) return null;

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== activeIndex && index >= 0 && index < images.length) {
      setActiveIndex(index);
      // Keep active thumbnail in view
      const thumbEl = thumbsRef.current?.children[index] as HTMLElement;
      thumbEl?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  const scrollToImage = (index: number) => {
    setActiveIndex(index);
    scrollerRef.current?.scrollTo({
      left: index * (scrollerRef.current?.clientWidth ?? 0),
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col lg:hidden overflow-hidden">

      {/* Top bar — Amazon style: back on left, counter on right */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-gray-200 shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-0.5 text-[#10887a] font-semibold text-sm"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
          Back
        </button>
        <span className="text-sm font-medium text-gray-500">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* Swipeable image viewer */}
      <div className="w-full h-72 shrink-0 overflow-hidden">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex h-full overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((image) => (
            <div
              key={image.id}
              className="shrink-0 w-full h-full snap-center relative bg-white"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Push thumbnail strip to bottom */}
      <div className="flex-1" />

      {/* Thumbnail strip */}
      <div className="shrink-0 border-t border-gray-200 bg-white">
        <div
          ref={thumbsRef}
          className="flex gap-1.5 overflow-x-auto px-3 py-2.5"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((image, index) => (
            <button
              key={`strip-${image.id}`}
              type="button"
              onClick={() => scrollToImage(index)}
              aria-label={`View photo ${index + 1}`}
              className={`shrink-0 w-14 h-14 rounded border-2 overflow-hidden transition-colors bg-gray-50 ${
                index === activeIndex
                  ? "border-[#10887a]"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileGalleryModal;
