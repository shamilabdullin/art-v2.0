import { getTranslations } from "next-intl/server";
import { searchArtworks } from "@/entities/painting";
import { Container, ErrorMessage } from "@/shared/ui";
import { PAGE_SIZE } from "@/shared/config/site";
import { PaintingsListClient } from "./PaintingsListClient";
import styles from "./PaintingsListPage.module.scss";

const REVALIDATE_SECONDS = 3600;

export async function PaintingsListPage() {
  const t = await getTranslations("paintingsList");
  const tCommon = await getTranslations("common");

  let initialData;
  try {
    initialData = await searchArtworks({ page: 1, limit: PAGE_SIZE.paintingsList, revalidate: REVALIDATE_SECONDS });
  } catch {
    return (
      <Container>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t("title")}</h1>
          <ErrorMessage title={tCommon("errorTitle")} description={t("errorDescription")} />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{t("title")}</h1>
        <PaintingsListClient initialData={initialData} />
      </div>
    </Container>
  );
}
