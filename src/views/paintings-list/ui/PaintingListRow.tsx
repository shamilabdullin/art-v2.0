import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getArtworkImageUrl, type ArtworkSummary } from "@/entities/painting";
import styles from "./PaintingListRow.module.scss";

export function PaintingListRow({ artwork }: { artwork: ArtworkSummary }) {
  const imageUrl = getArtworkImageUrl(artwork.image_id, "thumb");
  const subtitle = [artwork.artist_title, artwork.date_display].filter(Boolean).join(" · ");

  return (
    <Link href={`/painting/${artwork.id}`} className={styles.row}>
      <div className={styles.thumb}>
        {imageUrl ? <Image src={imageUrl} alt="" fill sizes="48px" className={styles.image} /> : null}
      </div>
      <div className={styles.texts}>
        <span className={styles.title}>{artwork.title}</span>
        {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
      </div>
    </Link>
  );
}
