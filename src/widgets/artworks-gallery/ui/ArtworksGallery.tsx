import { PaintingCard, type ArtworkSummary } from "@/entities/painting";
import styles from "./ArtworksGallery.module.scss";

interface ArtworksGalleryProps {
  artworks: ArtworkSummary[];
  /** Сколько первых карточек грузить с priority (для LCP на первом экране). */
  priorityCount?: number;
}

export function ArtworksGallery({ artworks, priorityCount = 0 }: ArtworksGalleryProps) {
  return (
    <div className={styles.grid}>
      {artworks.map((artwork, index) => (
        <PaintingCard key={artwork.id} artwork={artwork} priority={index < priorityCount} />
      ))}
    </div>
  );
}
