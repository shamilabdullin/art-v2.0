import { getTranslations } from "next-intl/server";
import { getPageNumbers } from "./getPageNumbers";
import { PageNavLink } from "./PageNavLink";
import { PageNumberLink } from "./PageNumberLink";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Строит href для заданного номера страницы, сохраняя остальные query-параметры. */
  buildHref: (page: number) => string;
  siblingCount?: number;
}

export async function Pagination({ currentPage, totalPages, buildHref, siblingCount = 1 }: PaginationProps) {
  if (totalPages <= 1) return null;

  const t = await getTranslations("pagination");
  const pages = getPageNumbers(currentPage, totalPages, siblingCount);

  return (
    <nav aria-label={t("label")} className={styles.nav}>
      <PageNavLink
        href={currentPage > 1 ? buildHref(currentPage - 1) : undefined}
        disabled={currentPage <= 1}
        label={t("prev")}
      />

      {pages.map((page, index) =>
        page === "gap" ? (
          <span key={`gap-${index}`} className={styles.gap}>
            …
          </span>
        ) : (
          <PageNumberLink key={page} page={page} href={buildHref(page)} isCurrent={page === currentPage} />
        ),
      )}

      <PageNavLink
        href={currentPage < totalPages ? buildHref(currentPage + 1) : undefined}
        disabled={currentPage >= totalPages}
        label={t("next")}
      />
    </nav>
  );
}
