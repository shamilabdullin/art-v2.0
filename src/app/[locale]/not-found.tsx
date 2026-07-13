import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/shared/ui";
import styles from "./not-found.module.scss";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container>
      <div className={styles.wrapper}>
        <span className={styles.code}>404</span>
        <p className={styles.title}>{t("title")}</p>
        <Link href="/" className={styles.link}>
          {t("backHome")}
        </Link>
      </div>
    </Container>
  );
}
