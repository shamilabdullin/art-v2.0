import { getTranslations } from "next-intl/server";
import { searchArtworks } from "@/entities/painting";
import { ArtworksGallery } from "@/widgets/artworks-gallery";
import { Container, EmptyState, ErrorMessage, Pagination } from "@/shared/ui";
import { PAGE_SIZE } from "@/shared/config/site";
import styles from "./SearchResultsPage.module.scss";

interface SearchResultsPageProps {
  q: string;
  page: number;
}

export async function SearchResultsPage({ q, page }: SearchResultsPageProps) {
  const t = await getTranslations("searchPage");
  const tCommon = await getTranslations("common");

  if (!q) {
    return (
      <Container>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t("title")}</h1>
          <EmptyState title={t("promptTitle")} description={t("promptDescription")} />
        </div>
      </Container>
    );
  }

  let result;
  try {
    result = await searchArtworks({ q, page, limit: PAGE_SIZE.searchResults, revalidate: 0 });
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
        <h1 className={styles.title}>{t("resultsTitle", { query: q })}</h1>
        <p className={styles.count}>{t("countLabel", { count: result.pagination.total })}</p>

        {result.data.length === 0 ? (
          <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
        ) : (
          <>
            <ArtworksGallery artworks={result.data} priorityCount={4} />
            <Pagination
              currentPage={page}
              totalPages={result.pagination.total_pages}
              buildHref={(p) => `/search?q=${encodeURIComponent(q)}&page=${p}`}
            />
          </>
        )}
      </div>
    </Container>
  );
}
