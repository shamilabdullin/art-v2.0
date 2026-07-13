import type { ArtworkDetails } from "@/entities/painting";

export interface MetaRow {
  label: string;
  value: string;
}

export function buildMetaRows(artwork: ArtworkDetails, t: (key: string) => string): MetaRow[] {
  const candidates: [string, string | null][] = [
    [t("metaAuthor"), artwork.artist_display],
    [t("metaDate"), artwork.date_display],
    [t("metaPlace"), artwork.place_of_origin],
    [t("metaMedium"), artwork.medium_display],
    [t("metaDimensions"), artwork.dimensions],
    [t("metaStyle"), artwork.style_title],
    [t("metaClassification"), artwork.classification_title],
    [t("metaDepartment"), artwork.department_title],
    [t("metaCredit"), artwork.credit_line],
  ];

  return candidates
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([label, value]) => ({ label, value }));
}
