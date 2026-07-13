export interface ArtistSummary {
  id: number;
  title: string;
  birth_date: number | null;
  death_date: number | null;
}

export interface ArtistDetails extends ArtistSummary {
  description: string | null;
  alt_titles: string[] | null;
}
