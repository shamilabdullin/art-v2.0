import { getTranslations } from "next-intl/server";
import { searchArtworks } from "@/entities/painting";
import { ArtworksGallery } from "@/widgets/artworks-gallery";
import { Container, EmptyState, ErrorMessage, Pagination } from "@/shared/ui";
import { PAGE_SIZE } from "@/shared/config/site";
import styles from "./MaturePage.module.scss";

const REVALIDATE_SECONDS = 3600;
const MATURE_SUBJECT = "nudes";

export async function MaturePage({ page }: { page: number }) {
  const t = await getTranslations("mature");
  const tCommon = await getTranslations("common");

  let result;
  try {
    result = await searchArtworks({
      subjectMatch: MATURE_SUBJECT,
      page,
      limit: PAGE_SIZE.matureList,
      revalidate: REVALIDATE_SECONDS,
    });
  } catch {
    return (
      <Container>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t("pageTitle")}</h1>
          <ErrorMessage title={tCommon("errorTitle")} description={t("errorDescription")} />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{t("pageTitle")}</h1>
        {result.data.length === 0 ? (
          <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
        ) : (
          <>
            <ArtworksGallery artworks={result.data} />
            <Pagination
              currentPage={page}
              totalPages={result.pagination.total_pages}
              buildHref={(p) => `/mature?page=${p}`}
            />
          </>
        )}
      </div>
    </Container>
  );
}
