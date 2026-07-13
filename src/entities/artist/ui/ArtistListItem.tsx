import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatArtistYears } from "../lib/formatArtistYears";
import type { ArtistSummary } from "../model/types";
import styles from "./ArtistListItem.module.scss";

export async function ArtistListItem({ artist }: { artist: ArtistSummary }) {
  const t = await getTranslations("years");
  const years = formatArtistYears(artist.birth_date, artist.death_date, t("present"));

  return (
    <Link href={`/artists/${artist.id}`} className={styles.item}>
      <span className={styles.name}>{artist.title}</span>
      {years ? <span className={styles.years}>{years}</span> : null}
    </Link>
  );
}
