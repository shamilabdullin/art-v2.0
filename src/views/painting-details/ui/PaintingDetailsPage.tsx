import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ApiError } from "@/shared/api";
import { Container } from "@/shared/ui";
import { getArtwork, getArtworkImageUrl } from "@/entities/painting";
import { buildMetaRows } from "../lib/buildMetaRows";
import { PaintingMeta } from "./PaintingMeta";
import styles from "./PaintingDetailsPage.module.scss";

const REVALIDATE_SECONDS = 3600;

export async function PaintingDetailsPage({ id }: { id: string }) {
  const t = await getTranslations("painting");

  let artwork;
  try {
    const response = await getArtwork(id, { revalidate: REVALIDATE_SECONDS });
    artwork = response.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const imageUrl = getArtworkImageUrl(artwork.image_id, "full");
  const metaRows = buildMetaRows(artwork, t);

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={artwork.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={styles.image}
                priority
              />
            ) : null}
          </div>
        </div>

        <div className={styles.infoColumn}>
          <div>
            <h1 className={styles.title}>{artwork.title}</h1>
            {artwork.artist_title ? (
              <p className={styles.subtitle}>
                {artwork.artist_id ? (
                  <Link href={`/artists/${artwork.artist_id}`} className={styles.artistLink}>
                    {artwork.artist_title}
                  </Link>
                ) : (
                  artwork.artist_title
                )}
                {artwork.date_display ? `, ${artwork.date_display}` : ""}
              </p>
            ) : null}
          </div>

          {artwork.description ? (
            <div>
              <p className={styles.sectionTitle}>{t("about")}</p>
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: artwork.description }} />
            </div>
          ) : null}

          {metaRows.length > 0 ? (
            <div>
              <p className={styles.sectionTitle}>{t("details")}</p>
              <PaintingMeta rows={metaRows} />
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
