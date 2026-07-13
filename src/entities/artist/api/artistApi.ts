import { apiFetch, type ApiListResponse, type ApiSingleResponse } from "@/shared/api";
import { ARTIST_DETAILS_FIELDS, ARTIST_SUMMARY_FIELDS } from "./fields";
import type { ArtistDetails, ArtistSummary } from "../model/types";

interface ListArtistsParams {
  page?: number;
  limit?: number;
  q?: string;
  revalidate?: number | false;
}

export function listArtists({ page = 1, limit = 20, q, revalidate }: ListArtistsParams = {}): Promise<
  ApiListResponse<ArtistSummary>
> {
  const path = q ? "artists/search" : "artists";
  const searchParams = new URLSearchParams({
    fields: ARTIST_SUMMARY_FIELDS,
    page: String(page),
    limit: String(limit),
  });
  if (q) searchParams.set("q", q);

  return apiFetch<ApiListResponse<ArtistSummary>>(path, { searchParams, revalidate });
}

export function getArtist(
  id: number | string,
  options: { revalidate?: number | false } = {},
): Promise<ApiSingleResponse<ArtistDetails>> {
  const searchParams = new URLSearchParams({ fields: ARTIST_DETAILS_FIELDS });
  return apiFetch<ApiSingleResponse<ArtistDetails>>(`artists/${id}`, {
    searchParams,
    revalidate: options.revalidate,
  });
}
