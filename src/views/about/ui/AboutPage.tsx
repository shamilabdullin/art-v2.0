import { getTranslations } from "next-intl/server";
import { Container } from "@/shared/ui";
import { aboutContent } from "../model/content";
import styles from "./AboutPage.module.scss";

export async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <Container>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{t("title")}</h1>
        <div className={styles.content}>
          {aboutContent.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {aboutContent.contacts.length > 0 ? (
          <div className={styles.contacts}>
            {aboutContent.contacts.map((contact) => (
              <a key={contact.href} href={contact.href} className={styles.contactLink}>
                {contact.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  );
}
