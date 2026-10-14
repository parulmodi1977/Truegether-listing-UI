import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductImage } from "@/types/product.types";

interface PhotoGridModalProps {
  images: ProductImage[];
  isOpen: boolean;
  onClose: () => void;
  onSelectImage?: (index: number) => void;
}

function PhotoGridModal({
  images,
  isOpen,
  onClose,
  onSelectImage,
}: PhotoGridModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "preview">("grid");

  const handleSelectImage = (index: number) => {
    setSelectedIndex(index);
    setViewMode("preview");
    onSelectImage?.(index);
  };

  const goToPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              All Photos ({images.length})
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "grid"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("preview")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "preview"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Preview
                </button>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="ml-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {viewMode === "grid" ? (
              // Grid View
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => handleSelectImage(index)}
                    className="group relative overflow-hidden rounded-lg aspect-square bg-gray-100 hover:shadow-lg transition-shadow"
                    aria-label={`Select image: ${image.alt}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 rounded-full p-2">
                        <ChevronRight size={20} className="text-gray-900" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              // Preview View
              <div className="flex items-center justify-center h-full bg-gray-50 p-4">
                <div className="relative max-w-2xl w-full">
                  {/* Main Image */}
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-4">
                    <img
                      src={images[selectedIndex].src}
                      alt={images[selectedIndex].alt}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <button
                      type="button"
                      onClick={goToPrev}
                      aria-label="Previous image"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <span className="text-sm font-medium text-gray-600">
                      {selectedIndex + 1} / {images.length}
                    </span>

                    <button
                      type="button"
                      onClick={goToNext}
                      aria-label="Next image"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Thumbnail strip */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                      <button
                        key={image.id}
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className={`h-16 w-16 shrink-0 rounded-lg border-2 overflow-hidden transition-colors ${
                          index === selectedIndex
                            ? "border-gray-900 shadow-md"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        aria-label={`Select image ${index + 1}`}
                        aria-current={index === selectedIndex}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PhotoGridModal;
