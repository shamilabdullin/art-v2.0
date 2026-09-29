import type { ImageSize } from "@/shared/api";

/** URL картинки через собственный прокси (см. src/app/api/iiif). */
export function getArtworkImageUrl(imageId: string | null, size: ImageSize = "card"): string | null {
  if (!imageId) return null;
  return `/api/iiif/${imageId}/${size}`;
}
