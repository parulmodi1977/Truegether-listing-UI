import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { product } from "@/data/listing";
import type { ProductImage } from "@/types/product.types";

interface ImagePopupProps {
  open: boolean;
  onClose: () => void;
  images?: ProductImage[];
  photosCount?: number;
  initialIndex?: number;
}

const ZOOM_STEP = 30;
const ZOOM_MIN = 100;
const ZOOM_MAX = 350;

function ImagePopup({
  open,
  onClose,
  images = product.images,
  photosCount,
  initialIndex = 0,
}: ImagePopupProps) {
  const totalPhotos =
    typeof photosCount === "number" && photosCount > 0
      ? photosCount
      : images.length;

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(100);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const imgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setActiveIndex(initialIndex);
      setZoom(100);
      setOrigin({ x: 50, y: 50 });
    }
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i === 0 ? totalPhotos - 1 : i - 1));
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i === totalPhotos - 1 ? 0 : i + 1));
    };
    window.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, totalPhotos]);

  // Non-passive scroll-to-zoom
  useEffect(() => {
    if (!open) return;
    const el = imgContainerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((z) =>
        Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)))
      );
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [open]);

  if (!open) return null;

  const allPhotos: ProductImage[] = Array.from(
    { length: totalPhotos },
    (_, i) => images[i % images.length]
  );
  const activeImage = allPhotos[activeIndex] ?? allPhotos[0];

  const switchTo = (index: number) => {
    setActiveIndex(index);
    setZoom(100);
    setOrigin({ x: 50, y: 50 });
  };

  const goPrev = () =>
    switchTo(activeIndex === 0 ? totalPhotos - 1 : activeIndex - 1);
  const goNext = () =>
    switchTo(activeIndex === totalPhotos - 1 ? 0 : activeIndex + 1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom === 100) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleClick = () => {
    if (zoom > 100) {
      setZoom(100);
      setOrigin({ x: 50, y: 50 });
    } else {
      setZoom(200);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Product image gallery"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-0 sm:p-4 md:p-6"
      onClick={onClose}
    >
      {/* Container: full screen on mobile, floating modal on sm+ */}
      <div
        className="relative flex w-full h-full sm:max-w-6xl sm:h-auto sm:max-h-[90vh] lg:max-h-[82vh] flex-col overflow-hidden sm:rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex shrink-0 items-center justify-between px-4 py-2 border-b border-gray-100 sm:border-b-0">
          <span className="text-sm font-medium text-gray-600">
            {activeIndex + 1}{" "}
            <span className="text-gray-400 font-normal">/ {totalPhotos}</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 min-h-0 flex-col lg:flex-row">
          {/* Main image viewer */}
          <div className="flex flex-1 min-h-0 flex-col items-center bg-white lg:px-14 xl:px-20 pt-2 pb-2 gap-2">

            {/* Image row */}
            <div className="relative flex flex-1 min-h-0 items-center gap-2 w-full">

              {/* Desktop arrows — flex siblings beside the image */}
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="hidden lg:flex shrink-0 self-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 items-center justify-center text-gray-600 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Image */}
              <div
                ref={imgContainerRef}
                className="flex-1 min-w-0 h-full overflow-hidden bg-white select-none"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => zoom === 100 && setOrigin({ x: 50, y: 50 })}
                onClick={handleClick}
              >
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  draggable={false}
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: `${origin.x}% ${origin.y}%`,
                    transition: zoom === 100 ? "transform 0.25s ease-out" : "none",
                    cursor: zoom > 100 ? "zoom-out" : "zoom-in",
                  }}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Desktop right arrow */}
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="hidden lg:flex shrink-0 self-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 items-center justify-center text-gray-600 transition-colors"
              >
                <ChevronRight size={18} />
              </button>

              {/* Mobile / tablet overlay arrows */}
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="lg:hidden absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 shadow-md flex items-center justify-center text-gray-700 transition-colors hover:bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 shadow-md flex items-center justify-center text-gray-700 transition-colors hover:bg-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Desktop zoom hint */}
            <div className="hidden lg:flex shrink-0 items-center gap-1.5 text-xs text-gray-400">
              <ZoomIn size={12} />
              <span>Scroll or click to zoom</span>
            </div>
          </div>

          {/* Right panel — desktop only */}
          <div className="hidden lg:flex w-80 shrink-0 flex-col border-l border-gray-100">
            <div className="px-4 pt-4 pb-2 shrink-0">
              <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-4">
                {product.title}
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pt-2">
              <div className="grid grid-cols-3 gap-2.5">
                {allPhotos.map((image, index) => (
                  <button
                    key={`grid-${index}`}
                    type="button"
                    onClick={() => switchTo(index)}
                    aria-label={`View photo ${index + 1}`}
                    className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                      index === activeIndex
                        ? "border-[#04352A]"
                        : "border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="px-5 py-3 flex items-center gap-1.5 text-xs text-gray-400">
              <ZoomIn size={14} />
              Scroll or click image to zoom
            </div>
          </div>
        </div>

        {/* Mobile / tablet horizontal thumbnail strip */}
        <div className="lg:hidden shrink-0 border-t border-gray-100 px-3 py-2.5">
          <div className="flex gap-2 overflow-x-auto">
            {allPhotos.map((image, index) => (
              <button
                key={`strip-${index}`}
                type="button"
                onClick={() => switchTo(index)}
                aria-label={`View photo ${index + 1}`}
                className={`shrink-0 w-14 h-14 rounded-lg border-2 overflow-hidden transition-colors ${
                  index === activeIndex
                    ? "border-[#10887a]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
