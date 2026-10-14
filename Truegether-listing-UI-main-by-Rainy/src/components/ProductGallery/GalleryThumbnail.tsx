import type { ProductImage } from "@/types/product.types";

interface GalleryThumbnailProps {
  image: ProductImage;
  isActive: boolean;
  onSelect: () => void;
}

function GalleryThumbnail({ image, isActive, onSelect }: GalleryThumbnailProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={image.alt}
      aria-current={isActive}
      className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-16 sm:w-16 ${
        isActive ? "border-[#04352A]" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
    </button>
  );
}

export default GalleryThumbnail;
