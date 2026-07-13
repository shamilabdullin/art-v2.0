import { getTranslations } from "next-intl/server";
import { listArtists, ArtistListItem } from "@/entities/artist";
import { Container, EmptyState, ErrorMessage, Pagination } from "@/shared/ui";
import { PAGE_SIZE } from "@/shared/config/site";
import styles from "./ArtistsListPage.module.scss";

const REVALIDATE_SECONDS = 3600;

export async function ArtistsListPage({ page }: { page: number }) {
  const t = await getTranslations("artists");
  const tCommon = await getTranslations("common");

  let artists;
  let totalPages = 0;

  try {
    const response = await listArtists({ page, limit: PAGE_SIZE.artistsList, revalidate: REVALIDATE_SECONDS });
    artists = response.data;
    totalPages = response.pagination.total_pages;
  } catch {
    return (
      <Container>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t("title")}</h1>
          <ErrorMessage title={tCommon("errorTitle")} description={t("errorDescription")} />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{t("title")}</h1>

        {artists.length === 0 ? (
          <EmptyState title={t("emptyTitle")} />
        ) : (
          <>
            <div className={styles.grid}>
              {artists.map((artist) => (
                <ArtistListItem key={artist.id} artist={artist} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} buildHref={(p) => `/artists?page=${p}`} />
          </>
        )}
      </div>
    </Container>
  );
}
