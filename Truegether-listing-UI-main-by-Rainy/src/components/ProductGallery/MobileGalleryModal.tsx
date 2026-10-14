import { useState, useRef, useEffect } from "react";
import { ArrowLeft, LayoutGrid, Maximize } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"fullscreen" | "grid">("fullscreen");
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Sync activeIndex with initialIndex when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
      setViewMode("fullscreen");
      // Scroll to the correct image immediately
      setTimeout(() => {
        const el = scrollerRef.current;
        if (el) {
          el.scrollTo({ left: initialIndex * el.clientWidth, behavior: "instant" });
        }
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
    }
  };

  const handleGridImageTap = (index: number) => {
    setActiveIndex(index);
    setViewMode("fullscreen");
    setTimeout(() => {
      const el = scrollerRef.current;
      if (el) {
        el.scrollTo({ left: index * el.clientWidth, behavior: "instant" });
      }
    }, 0);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col lg:hidden overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 z-10 bg-white">
        <button
          type="button"
          onClick={viewMode === "fullscreen" ? onClose : () => setViewMode("fullscreen")}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <button
          type="button"
          onClick={() => setViewMode(viewMode === "fullscreen" ? "grid" : "fullscreen")}
          className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {viewMode === "fullscreen" ? (
            <LayoutGrid size={24} className="text-gray-900" />
          ) : (
            <Maximize size={24} className="text-gray-900" />
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {viewMode === "fullscreen" ? (
          <>
            <div
              ref={scrollerRef}
              onScroll={handleScroll}
              className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {images.map((image) => (
                <div
                  key={image.id}
                  className="shrink-0 w-full h-full snap-center flex items-center justify-center p-4"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-6 left-0 right-0 px-6 flex items-center justify-between">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {images.map((image, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={`dot-${image.id}`}
                      className={`h-2 rounded-full transition-all ${
                        isActive ? "w-2 bg-[#04352A]" : "w-2 bg-gray-200"
                      }`}
                    />
                  );
                })}
              </div>
              
              {/* Counter */}
              <div className="text-sm font-semibold text-gray-500">
                {activeIndex + 1} / {images.length}
              </div>
            </div>
          </>
        ) : (
          /* Grid View */
          <div className="flex-1 overflow-y-auto p-4 pt-0">
            <div className="grid grid-cols-2 gap-3 pb-8">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => handleGridImageTap(index)}
                  className="aspect-square rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center p-2"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain mix-blend-multiply"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileGalleryModal;
