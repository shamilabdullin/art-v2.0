import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HOME_TAGS } from "../model/tags";
import styles from "./PopularTags.module.scss";

export async function PopularTags() {
  const t = await getTranslations("home");

  return (
    <nav className={styles.wrapper} aria-label={t("tagsTitle")}>
      <ul className={styles.list}>
        {HOME_TAGS.map((tag) => (
          <li key={tag}>
            <Link href={`/search?q=${encodeURIComponent(tag)}`} className={styles.tag}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
