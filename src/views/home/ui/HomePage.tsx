import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { searchArtworks } from "@/entities/painting";
import { ArtworksGallery } from "@/widgets/artworks-gallery";
import { Container, ErrorMessage } from "@/shared/ui";
import { PAGE_SIZE } from "@/shared/config/site";
import { Hero } from "./Hero";
import styles from "./HomePage.module.scss";

const REVALIDATE_SECONDS = 3600;

export async function HomePage() {
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");

  let artworks;
  try {
    const response = await searchArtworks({ limit: PAGE_SIZE.home, revalidate: REVALIDATE_SECONDS });
    artworks = response.data;
  } catch {
    return (
      <Container>
        <Hero />
        <ErrorMessage title={tCommon("errorTitle")} description={t("errorDescription")} />
      </Container>
    );
  }

  return (
    <Container>
      <Hero />
      <section className={styles.wrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t("featuredTitle")}</h2>
          <Link href="/paintings" className={styles.sectionLink}>
            {t("viewAll")}
          </Link>
        </div>
        <ArtworksGallery artworks={artworks} priorityCount={4} />
      </section>
    </Container>
  );
}
