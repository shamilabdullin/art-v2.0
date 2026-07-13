import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/shared/config/site";
import styles from "./Hero.module.scss";

export async function Hero() {
  const t = await getTranslations("home");
  const tSite = await getTranslations("site");

  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>{t("title", { siteName: SITE_NAME })}</h1>
      <p className={styles.description}>{t("description", { description: tSite("description") })}</p>
    </section>
  );
}
