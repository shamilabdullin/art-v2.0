import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getArtworkImageUrl } from "../lib/getArtworkImageUrl";
import type { ArtworkSummary } from "../model/types";
import styles from "./PaintingCard.module.scss";

interface PaintingCardProps {
  artwork: ArtworkSummary;
  priority?: boolean;
}

export function PaintingCard({ artwork, priority }: PaintingCardProps) {
  const imageUrl = getArtworkImageUrl(artwork.image_id, "card");

  return (
    <Link href={`/painting/${artwork.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={artwork.title}
            fill
            sizes="(min-width: 1024px) 23vw, (min-width: 768px) 30vw, 45vw"
            className={styles.image}
            priority={priority}
          />
        ) : null}
      </div>
      <div>
        <p className={styles.title}>{artwork.title}</p>
        {artwork.artist_title ? <p className={styles.artist}>{artwork.artist_title}</p> : null}
      </div>
    </Link>
  );
}
