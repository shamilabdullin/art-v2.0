"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useArtworksSearchQuery, type ArtworkSummary } from "@/entities/painting";
import { EmptyState, ErrorMessage } from "@/shared/ui";
import { useDebouncedValue } from "@/shared/lib/hooks/useDebouncedValue";
import { PAGE_SIZE } from "@/shared/config/site";
import type { ApiListResponse } from "@/shared/api";
import { ClientPager } from "./ClientPager";
import { FilterInput } from "./FilterInput";
import { PaintingListRow } from "./PaintingListRow";
import { PaintingListRowSkeleton } from "./PaintingListRowSkeleton";
import styles from "./PaintingsListClient.module.scss";

const DEBOUNCE_MS = 400;

export function PaintingsListClient({ initialData }: { initialData: ApiListResponse<ArtworkSummary> }) {
  const t = useTranslations("paintingsList");
  const tCommon = useTranslations("common");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebouncedValue(query, DEBOUNCE_MS);

  // Сброс страницы при изменении запроса — стандартный паттерн React
  // "adjusting state during render" вместо setState в useEffect.
  const [queryForPageReset, setQueryForPageReset] = useState(debouncedQuery);
  if (debouncedQuery !== queryForPageReset) {
    setQueryForPageReset(debouncedQuery);
    setPage(1);
  }

  const isDefaultParams = debouncedQuery === "" && page === 1;
  const { data, isFetching, isError } = useArtworksSearchQuery({
    q: debouncedQuery || undefined,
    page,
    limit: PAGE_SIZE.paintingsList,
    initialData: isDefaultParams ? initialData : undefined,
  });

  return (
    <div>
      <FilterInput value={query} onChange={setQuery} isLoading={isFetching} />

      {isError ? (
        <ErrorMessage title={tCommon("errorTitle")} description={t("errorDescriptionRetry")} />
      ) : data && data.data.length === 0 ? (
        <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <>
          <div className={styles.list}>
            {data
              ? data.data.map((artwork) => <PaintingListRow key={artwork.id} artwork={artwork} />)
              : Array.from({ length: 8 }).map((_, index) => <PaintingListRowSkeleton key={index} />)}
          </div>
          <ClientPager
            currentPage={page}
            totalPages={data?.pagination.total_pages ?? 0}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
