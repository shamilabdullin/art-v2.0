/** Поля картины, которых достаточно для карточки в коллаже/списке. */
export interface ArtworkSummary {
  id: number;
  title: string;
  image_id: string | null;
  artist_title: string | null;
  date_display: string | null;
}

/** Полные данные картины для страницы произведения. */
export interface ArtworkDetails extends ArtworkSummary {
  artist_id: number | null;
  artist_display: string | null;
  place_of_origin: string | null;
  medium_display: string | null;
  dimensions: string | null;
  credit_line: string | null;
  description: string | null;
  department_title: string | null;
  style_title: string | null;
  classification_title: string | null;
  is_public_domain: boolean;
}
