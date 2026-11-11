import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GalleryThumbnail from "./GalleryThumbnail";
import ImagePopup from "@/components/ImagePopup/ImagePopup";
import { product } from "@/data/listing";
import type { ProductImage } from "@/types/product.types";

interface ProductGalleryProps {
  images?: ProductImage[];
}

const ZOOM = 2.5;

function ProductGallery({ images = product.images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [hoverPos, setHoverPos] = useState({ x: 50, y: 50 });
  const mainImgRef = useRef<HTMLDivElement>(null);
  const activeImage = images[activeIndex];

  const goPrev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = mainImgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 0), 100);
    const y = Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 100, 0), 100);
    setHoverPos({ x, y });
  };

  const lensSize = 100 / ZOOM;
  const lensLeft = Math.min(Math.max(hoverPos.x - lensSize / 2, 0), 100 - lensSize);
  const lensTop  = Math.min(Math.max(hoverPos.y - lensSize / 2, 0), 100 - lensSize);

  return (
    <>
      <div className="relative">
        <div className="grid w-full gap-3 sm:gap-4 grid-cols-[40px_1fr] lg:grid-cols-[40px_460px]">

          {/* Thumbnail rail */}
          <div className="flex flex-col gap-2 sm:gap-3 shrink-0 overflow-y-auto h-full">
            {images.map((image, index) => (
              <GalleryThumbnail
                key={image.id}
                image={image}
                isActive={index === activeIndex}
                onSelect={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Main viewer */}
          <div
            ref={mainImgRef}
            className="relative min-w-0 aspect-square rounded-xl border border-gray-200 overflow-hidden bg-white"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
          >
            <button
              type="button"
              onClick={() => setPopupOpen(true)}
              aria-label="Open image gallery"
              className={`block h-full w-full ${isZooming ? "cursor-crosshair" : "cursor-zoom-in"}`}
            >
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="w-full h-full object-contain"
              />
            </button>

            {/* Lens overlay */}
            {isZooming && (
              <div
                className="absolute pointer-events-none border border-gray-400/50 bg-white/15"
                style={{
                  width: `${lensSize}%`,
                  height: `${lensSize}%`,
                  left: `${lensLeft}%`,
                  top: `${lensTop}%`,
                }}
              />
            )}

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

        {/* Magnified panel — appears to the right on lg screens only */}
        {isZooming && (
          <div
            className="absolute top-0 left-full z-50 ml-4 w-[460px] h-[460px] rounded-xl border border-gray-200 shadow-2xl overflow-hidden pointer-events-none hidden lg:block"
            style={{
              backgroundImage: `url(${activeImage.src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${ZOOM * 100}%`,
              backgroundPosition: `${hoverPos.x}% ${hoverPos.y}%`,
            }}
          />
        )}
      </div>

      <ImagePopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        images={images}
        initialIndex={activeIndex}
      />
    </>
  );
}

export default ProductGallery;
