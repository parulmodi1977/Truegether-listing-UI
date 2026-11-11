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
      className={`h-10 w-10 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
        isActive ? "border-[#04352A]" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
    </button>
  );
}

export default GalleryThumbnail;
