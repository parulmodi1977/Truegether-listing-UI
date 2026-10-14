import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, LayoutGrid } from "lucide-react";
import type { ProductImage } from "@/types/product.types";

interface ImageLightboxProps {
  images: ProductImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onViewAll?: () => void;
  totalPhotos?: number;
}

function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
  onViewAll,
  totalPhotos,
}: ImageLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const activeImage = images[activeIndex];

  // Update active index when initialIndex changes
  useEffect(() => {
    setActiveIndex(initialIndex);
    setZoomLevel(1);
  }, [initialIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "+") {
        zoomIn();
      } else if (e.key === "-") {
        zoomOut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, zoomLevel]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const goPrev = () => {
    setActiveIndex((index) => (index === 0 ? images.length - 1 : index - 1));
    setZoomLevel(1);
  };

  const goNext = () => {
    setActiveIndex((index) => (index === images.length - 1 ? 0 : index + 1));
    setZoomLevel(1);
  };

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  };

  const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Dimmed Background */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Lightbox Container */}
      <div className="fixed inset-0 z-50 flex flex-col sm:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition-colors hover:bg-white hover:text-gray-900"
        >
          <X size={24} />
        </button>

        {/* Vertical Thumbnail Gallery (Left side) */}
        <div className="hidden md:flex md:flex-col md:gap-2 md:overflow-y-auto md:p-4 md:bg-black/30 md:w-24 md:items-center">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setZoomLevel(1);
              }}
              aria-label={`Select ${image.alt}`}
              aria-current={index === activeIndex}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                index === activeIndex
                  ? "border-white shadow-lg"
                  : "border-gray-500 opacity-60 hover:opacity-100 hover:border-gray-300"
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

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center relative p-4 sm:p-8 overflow-hidden">
          {/* Main Image Container */}
          <div
            className="relative flex items-center justify-center flex-1 max-h-[85vh] max-w-[85vw] overflow-hidden rounded-lg bg-black/20 transition-transform cursor-grab active:cursor-grabbing"
            onWheel={handleMouseWheel}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="h-full w-full object-contain transition-transform duration-300"
              style={{
                transform: `scale(${zoomLevel})`,
              }}
            />

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg border border-gray-200 transition-colors hover:bg-white hover:text-gray-900 z-10"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg border border-gray-200 transition-colors hover:bg-white hover:text-gray-900 z-10"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
              {activeIndex + 1} / {images.length}
            </div>
          </div>

          {/* Right Sidebar with Controls and Thumbnails (Mobile) */}
          <div className="flex flex-col gap-4 mt-4 sm:mt-0 sm:ml-4 items-center sm:w-auto">
            {/* Zoom Controls */}
            <div className="flex flex-col gap-2 bg-white/90 rounded-lg p-3 shadow-lg">
              <button
                type="button"
                onClick={zoomIn}
                disabled={zoomLevel >= 3}
                aria-label="Zoom in"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ZoomIn size={20} />
              </button>

              <div className="text-center text-xs font-medium text-gray-600 w-10">
                {Math.round(zoomLevel * 100)}%
              </div>

              <button
                type="button"
                onClick={zoomOut}
                disabled={zoomLevel <= 1}
                aria-label="Zoom out"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ZoomOut size={20} />
              </button>
            </div>

            {/* View All Photos Button */}
            {onViewAll && (
              <button
                type="button"
                onClick={onViewAll}
                aria-label={`View all ${totalPhotos || images.length} photos`}
                className="flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-lg border border-gray-300 bg-white/90 text-gray-700 shadow-lg transition-colors hover:bg-white hover:border-gray-400 cursor-pointer"
              >
                <LayoutGrid size={20} className="text-gray-600" />
                <span className="text-[8px] font-medium leading-tight text-center hidden sm:block">
                  All
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Thumbnail Gallery (Below main image) */}
        <div className="md:hidden flex gap-2 overflow-x-auto p-4 bg-black/30 w-full justify-center">
          {images.slice(0, 10).map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setZoomLevel(1);
              }}
              aria-label={`Select ${image.alt}`}
              aria-current={index === activeIndex}
              className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-colors flex-shrink-0 ${
                index === activeIndex
                  ? "border-white shadow-lg"
                  : "border-gray-500 opacity-60 hover:opacity-100"
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
    </>
  );
}

export default ImageLightbox;
