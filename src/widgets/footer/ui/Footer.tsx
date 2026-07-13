import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/shared/config/site";
import styles from "./Footer.module.scss";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>
          © {year} {SITE_NAME}. {t("credit")}{" "}
          <a
            href="https://api.artic.edu/docs/"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.link}
          >
            Art Institute of Chicago API
          </a>
          .
        </span>
        <Link href="/about" className={styles.link}>
          {t("aboutLink")}
        </Link>
      </div>
    </footer>
  );
}
