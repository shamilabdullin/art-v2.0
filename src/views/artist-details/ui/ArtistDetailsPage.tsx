import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ApiError } from "@/shared/api";
import { getArtist, formatArtistYears } from "@/entities/artist";
import { searchArtworks } from "@/entities/painting";
import { ArtworksGallery } from "@/widgets/artworks-gallery";
import { Container, EmptyState, Pagination } from "@/shared/ui";
import { PAGE_SIZE } from "@/shared/config/site";
import styles from "./ArtistDetailsPage.module.scss";

const REVALIDATE_SECONDS = 3600;

interface ArtistDetailsPageProps {
  id: string;
  page: number;
}

export async function ArtistDetailsPage({ id, page }: ArtistDetailsPageProps) {
  const t = await getTranslations("artistDetail");
  const tYears = await getTranslations("years");

  let artist;
  try {
    const response = await getArtist(id, { revalidate: REVALIDATE_SECONDS });
    artist = response.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const artworksResponse = await searchArtworks({
    artistId: artist.id,
    page,
    limit: PAGE_SIZE.artistArtworks,
    revalidate: REVALIDATE_SECONDS,
  });
  const years = formatArtistYears(artist.birth_date, artist.death_date, tYears("present"));

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.name}>{artist.title}</h1>
          {years ? <span className={styles.years}>{years}</span> : null}
          {artist.description ? (
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: artist.description }} />
          ) : null}
        </div>

        {artworksResponse.data.length === 0 ? (
          <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
        ) : (
          <>
            <ArtworksGallery artworks={artworksResponse.data} priorityCount={4} />
            <Pagination
              currentPage={page}
              totalPages={artworksResponse.pagination.total_pages}
              buildHref={(p) => `/artists/${id}?page=${p}`}
            />
          </>
        )}
      </div>
    </Container>
  );
}
