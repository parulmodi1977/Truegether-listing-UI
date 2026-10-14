import { useRef, useState } from "react";
import { product } from "@/data/listing";
import type { ProductImage } from "@/types/product.types";
import MobileGalleryModal from "./MobileGalleryModal";

interface MobileProductGalleryProps {
  images?: ProductImage[];
  onImageTap?: (index: number) => void;
}

function MobileProductGallery({
  images = product.images,
  onImageTap,
}: MobileProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== activeIndex && index >= 0 && index < images.length) {
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  const handleTap = (index: number) => {
    if (onImageTap) {
      onImageTap(index);
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="relative w-full bg-white lg:hidden">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex w-full aspect-square overflow-x-auto snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => handleTap(index)}
              aria-label={`View ${image.alt}`}
              className="shrink-0 w-full h-full snap-center flex items-center justify-center bg-gray-50 cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </button>
          ))}
        </div>

        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-[11px] font-medium pointer-events-none">
          {activeIndex + 1}/{images.length}
        </div>

        <div className="flex items-center justify-center gap-1.5 py-3">
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`dot-${image.id}`}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={isActive}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  isActive ? "w-4 bg-[#04352A]" : "w-1.5 bg-gray-300"
                }`}
              />
            );
          })}
        </div>
      </section>

      <MobileGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        initialIndex={activeIndex}
      />
    </>
  );
}

export default MobileProductGallery;
