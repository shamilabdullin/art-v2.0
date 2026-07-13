import { apiFetch, type ApiListResponse, type ApiSingleResponse } from "@/shared/api";
import { buildArtworkSearchParams } from "./buildArtworkSearchParams";
import { ARTWORK_DETAILS_FIELDS, ARTWORK_SUMMARY_FIELDS } from "./fields";
import type { ArtworkDetails, ArtworkSummary } from "../model/types";

interface SearchArtworksParams {
  q?: string;
  page?: number;
  limit?: number;
  artistId?: number;
  subjectMatch?: string;
  revalidate?: number | false;
  signal?: AbortSignal;
}

export function searchArtworks({
  q,
  page,
  limit,
  artistId,
  subjectMatch,
  revalidate,
  signal,
}: SearchArtworksParams): Promise<ApiListResponse<ArtworkSummary>> {
  const searchParams = buildArtworkSearchParams({
    q,
    page,
    limit,
    artistId,
    subjectMatch,
    fields: ARTWORK_SUMMARY_FIELDS,
  });
  return apiFetch<ApiListResponse<ArtworkSummary>>("artworks/search", { searchParams, revalidate, signal });
}

export function getArtwork(
  id: number | string,
  options: { revalidate?: number | false } = {},
): Promise<ApiSingleResponse<ArtworkDetails>> {
  const searchParams = new URLSearchParams({ fields: ARTWORK_DETAILS_FIELDS });
  return apiFetch<ApiSingleResponse<ArtworkDetails>>(`artworks/${id}`, {
    searchParams,
    revalidate: options.revalidate,
  });
}
