import { useEffect, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { product } from "@/data/listing";
import type { ProductImage } from "@/types/product.types";

interface ImagePopupProps {
  open: boolean;
  onClose: () => void;
  images?: ProductImage[];
  photosCount?: number;
  initialIndex?: number;
}

const ZOOM_STEP = 25;
const ZOOM_MIN = 50;
const ZOOM_MAX = 300;

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

  useEffect(() => {
    if (open) {
      setActiveIndex(initialIndex);
      setZoom(100);
    }
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i === 0 ? totalPhotos - 1 : i - 1));
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i === totalPhotos - 1 ? 0 : i + 1));
      }
    };

    window.addEventListener("keydown", handleKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose, totalPhotos]);

  if (!open) return null;

  const allPhotos: ProductImage[] = Array.from(
    { length: totalPhotos },
    (_, i) => images[i % images.length]
  );
  const activeImage = allPhotos[activeIndex] ?? allPhotos[0];

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? totalPhotos - 1 : i - 1));
  const goNext = () =>
    setActiveIndex((i) => (i === totalPhotos - 1 ? 0 : i + 1));

  const zoomOut = () => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP));
  const zoomIn = () => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Product image gallery"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-6xl h-full max-h-[92vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
        >
          <X size={22} />
        </button>

        <div className="flex flex-1 min-h-0 flex-col md:flex-row">
          {/* Left thumbnail rail */}
          <div className="flex md:flex-col md:w-24 shrink-0 items-center gap-2 border-b md:border-b-0 md:border-r border-gray-100 p-3 md:p-4">
            <div className="flex md:flex-col gap-2 flex-1 md:overflow-y-auto md:min-h-0 md:pr-1">
              {allPhotos.map((image, index) => (
                <button
                  key={`rail-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View ${image.alt}`}
                  aria-current={index === activeIndex}
                  className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    index === activeIndex
                      ? "border-[#04352A]"
                      : "border-gray-200 hover:border-gray-300"
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
            <ChevronDown
              size={18}
              className="hidden md:block text-gray-400 shrink-0"
              aria-hidden="true"
            />
          </div>

          {/* Main image viewer */}
          <div className="relative flex flex-1 items-center justify-center bg-white overflow-hidden">
            <div className="max-h-full max-w-full overflow-auto p-6">
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "center",
                  transition: "transform 0.2s ease-out",
                }}
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>

            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition-colors hover:bg-gray-50"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition-colors hover:bg-gray-50"
            >
              <ChevronRight size={20} />
            </button>

            {/* Bottom zoom toolbar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-white px-4 py-1.5 shadow-md text-sm text-gray-700">
              <span className="font-medium">
                {activeIndex + 1} <span className="text-gray-400">of {totalPhotos}</span>
              </span>
              <span className="h-4 w-px bg-gray-200" />
              <button
                type="button"
                onClick={zoomOut}
                aria-label="Zoom out"
                disabled={zoom <= ZOOM_MIN}
                className="flex h-6 w-6 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-40"
              >
                <ZoomOut size={14} />
              </button>
              <span className="min-w-[3ch] text-center font-medium tabular-nums">
                {zoom}%
              </span>
              <button
                type="button"
                onClick={zoomIn}
                aria-label="Zoom in"
                disabled={zoom >= ZOOM_MAX}
                className="flex h-6 w-6 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-40"
              >
                <ZoomIn size={14} />
              </button>
            </div>
          </div>

          {/* Right All Photos panel */}
          <div className="hidden lg:flex w-80 shrink-0 flex-col border-l border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h3 className="text-base font-semibold text-gray-900">
                All Photos ({totalPhotos})
              </h3>
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-gray-800"
              >
                <LayoutGrid size={14} />
                View All Photos
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-3 gap-2.5">
                {allPhotos.map((image, index) => (
                  <button
                    key={`grid-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
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

            <div className="border-t border-gray-100 px-5 py-3 flex items-center gap-1.5 text-xs text-gray-500">
              <ZoomIn size={14} />
              Click on any image to zoom
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
