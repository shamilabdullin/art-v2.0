import Image from "next/image";
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
        {aboutContent.photo ? (
          <div className={styles.photoWrapper}>
            <Image
              src={aboutContent.photo.src}
              alt={aboutContent.photo.alt}
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className={styles.photo}
              priority
            />
          </div>
        ) : null}
        <div className={styles.content}>
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
          <p>{t("paragraph3")}</p>
          <p>{t("paragraph4")}</p>
        </div>
        {aboutContent.contacts.length > 0 ? (
          <div className={styles.contacts}>
            {aboutContent.contacts.map((contact) => (
              <a key={contact.href} href={contact.href} className={styles.contactLink}>
                {t("githubLabel")}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  );
}
