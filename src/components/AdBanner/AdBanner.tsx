interface AdBannerProps {
  imageSrc?: string;
  linkHref?: string;
  altText?: string;
  className?: string;
}

/**
 * Reusable ad slot. Pass in a banner image and click-through URL.
 * Shows a placeholder skeleton when no image is provided.
 */
function AdBanner({
  imageSrc,
  linkHref = "#",
  altText = "Advertisement",
  className = "",
}: AdBannerProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="text-[10px] text-gray-400 text-center py-1">Sponsored</div>
      <a
        href={linkHref}
        target="_blank"
        rel="noopener sponsored"
        aria-label={altText}
        className="block w-full"
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="w-full aspect-[8/1] bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center text-xs text-gray-400">
            Advertisement
          </div>
        )}
      </a>
    </div>
  );
}

export default AdBanner;
