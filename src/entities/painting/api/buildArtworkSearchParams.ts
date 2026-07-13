interface ArtworkSearchFilters {
  q?: string;
  page?: number;
  limit?: number;
  fields?: string;
  artistId?: number;
  /** Ограничивает выборку произведениями с этим тегом в subject_titles (например, "nudes"). */
  subjectMatch?: string;
}

/** Поля, по которым ищет свободный текстовый запрос (параметр q). */
const FREE_TEXT_SEARCH_FIELDS = ["title", "subject_titles", "artist_title"];

/**
 * Собирает query-параметры для /artworks/search в формате Elasticsearch query DSL,
 * который принимает API Art Institute of Chicago. Всегда ограничивает выборку
 * произведениями с общественным достоянием и наличием изображения.
 *
 * Свободный текст (q) добавляется как отдельный multi_match-пункт внутри
 * query.bool.must, а не как отдельный параметр верхнего уровня: при наличии
 * кастомного query DSL API Art Institute of Chicago полностью игнорирует
 * top-level q и возвращает всю коллекцию без фильтрации по нему.
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
  if (q) {
    const clause = mustIndex++;
    params.set(`query[bool][must][${clause}][multi_match][query]`, q);
    FREE_TEXT_SEARCH_FIELDS.forEach((field, index) => {
      params.set(`query[bool][must][${clause}][multi_match][fields][${index}]`, field);
    });
    params.set(`query[bool][must][${clause}][multi_match][operator]`, "and");
  }

  return params;
}
