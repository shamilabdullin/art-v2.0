interface ArtworkSearchFilters {
  q?: string;
  page?: number;
  limit?: number;
  fields?: string;
  artistId?: number;
  /** Ограничивает выборку произведениями с этим тегом в subject_titles (например, "nudes"). */
  subjectMatch?: string;
}

/**
 * Собирает query-параметры для /artworks/search в формате Elasticsearch query DSL,
 * который принимает API Art Institute of Chicago. Всегда ограничивает выборку
 * произведениями с общественным достоянием и наличием изображения.
 */
export function buildArtworkSearchParams({
  q,
  page = 1,
  limit = 20,
  fields,
  artistId,
  subjectMatch,
}: ArtworkSearchFilters) {
  const params = new URLSearchParams();

  if (q) params.set("q", q);
  if (fields) params.set("fields", fields);
  params.set("page", String(page));
  params.set("limit", String(limit));

  let mustIndex = 0;
  params.set(`query[bool][must][${mustIndex++}][term][is_public_domain]`, "true");
  params.set(`query[bool][must][${mustIndex++}][exists][field]`, "image_id");
  if (artistId !== undefined) {
    params.set(`query[bool][must][${mustIndex++}][term][artist_id]`, String(artistId));
  }
  if (subjectMatch) {
    params.set(`query[bool][must][${mustIndex++}][match][subject_titles]`, subjectMatch);
  }

  return params;
}
