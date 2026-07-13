"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchArtworks } from "../api/paintingApi";
import { paintingQueryKeys } from "./queryKeys";
import type { ApiListResponse } from "@/shared/api";
import type { ArtworkSummary } from "./types";

interface UseArtworksSearchQueryParams {
  q?: string;
  page?: number;
  limit?: number;
  artistId?: number;
  initialData?: ApiListResponse<ArtworkSummary>;
}

export function useArtworksSearchQuery({ q, page = 1, limit = 20, artistId, initialData }: UseArtworksSearchQueryParams) {
  return useQuery({
    queryKey: paintingQueryKeys.search({ q, page, limit, artistId }),
    queryFn: ({ signal }) => searchArtworks({ q, page, limit, artistId, signal }),
    placeholderData: keepPreviousData,
    initialData,
  });
}
