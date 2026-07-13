import { PaintingCardSkeleton } from "@/entities/painting";
import styles from "./ArtworksGallery.module.scss";

export function ArtworksGallerySkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, index) => (
        <PaintingCardSkeleton key={index} />
      ))}
    </div>
  );
}
