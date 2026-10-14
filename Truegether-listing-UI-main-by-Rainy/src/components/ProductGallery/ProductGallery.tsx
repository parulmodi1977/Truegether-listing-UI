import { useState } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import GalleryThumbnail from "./GalleryThumbnail";
import ImagePopup from "@/components/ImagePopup/ImagePopup";
import { product } from "@/data/listing";
import type { ProductImage } from "@/types/product.types";

interface ProductGalleryProps {
  images?: ProductImage[];
  photosCount?: number;
}

function ProductGallery({
  images = product.images,
  photosCount = product.photosCount,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const activeImage = images[activeIndex];

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () =>
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      <div className="flex w-full gap-3 sm:gap-4">
        {/* Thumbnail rail */}
        <div className="flex flex-col gap-2 sm:gap-3 shrink-0">
          {images.map((image, index) => (
            <GalleryThumbnail
              key={image.id}
              image={image}
              isActive={index === activeIndex}
              onSelect={() => setActiveIndex(index)}
            />
          ))}

          <button
            type="button"
            onClick={() => setPopupOpen(true)}
            aria-label={`View all ${photosCount} photos`}
            className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg border-2 border-gray-200 hover:border-gray-300 flex flex-col items-center justify-center gap-0.5 text-gray-500 transition-colors"
          >
            <LayoutGrid size={16} />
            <span className="text-[9px] leading-none">{photosCount}</span>
          </button>
        </div>

        {/* Main viewer — stretches to fill remaining space */}
        <div className="relative flex-1 min-w-0 aspect-square rounded-xl border border-gray-200 overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setPopupOpen(true)}
            aria-label="Open image gallery"
            className="block h-full w-full cursor-zoom-in"
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="w-full h-full object-cover"
            />
          </button>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-600 hover:bg-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-600 hover:bg-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <ImagePopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        images={images}
        photosCount={photosCount}
        initialIndex={activeIndex}
      />
    </>
  );
}

export default ProductGallery;
