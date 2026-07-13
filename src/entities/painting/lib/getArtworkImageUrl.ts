import { IMAGE_SIZE, type ImageSize } from "@/shared/api";

const DEFAULT_IIIF_URL = "https://www.artic.edu/iiif/2";

export function getArtworkImageUrl(
  imageId: string | null,
  size: ImageSize = "card",
  iiifUrl: string = DEFAULT_IIIF_URL,
): string | null {
  if (!imageId) return null;
  return `${iiifUrl}/${imageId}/full/${IMAGE_SIZE[size]},/0/default.jpg`;
}
