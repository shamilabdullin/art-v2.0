export const API_BASE_URL = "https://api.artic.edu/api/v1/";

/** Ширины превью для IIIF Image API (см. https://api.artic.edu/docs/#iiif-image-api) */
export const IMAGE_SIZE = {
  thumb: 400,
  card: 843,
  full: 1686,
} as const;

export type ImageSize = keyof typeof IMAGE_SIZE;
