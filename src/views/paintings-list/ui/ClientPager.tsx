"use client";

import { useTranslations } from "next-intl";
import { getPageNumbers } from "@/shared/ui/pagination/getPageNumbers";
import { cn } from "@/shared/lib/utils/cn";
import styles from "@/shared/ui/pagination/Pagination.module.scss";

interface ClientPagerProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ClientPager({ currentPage, totalPages, onPageChange }: ClientPagerProps) {
  const t = useTranslations("pagination");

  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages, 1);

  return (
    <nav aria-label={t("label")} className={styles.nav}>
      <button
        type="button"
        className={cn(styles.navLink, currentPage <= 1 && styles.navLinkDisabled)}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {t("prev")}
      </button>

      {pages.map((page, index) =>
        page === "gap" ? (
          <span key={`gap-${index}`} className={styles.gap}>
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(styles.pageLink, page === currentPage && styles.pageLinkActive)}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        className={cn(styles.navLink, currentPage >= totalPages && styles.navLinkDisabled)}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {t("next")}
      </button>
    </nav>
  );
}
