"use client";

import { useTranslations } from "next-intl";
import { Container, ErrorMessage } from "@/shared/ui";
import styles from "./error.module.scss";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("error");
  const tCommon = useTranslations("common");

  return (
    <Container>
      <div className={styles.wrapper}>
        <ErrorMessage title={tCommon("errorTitle")} description={t("description")} />
        <button type="button" onClick={reset} className={styles.retryButton}>
          {t("retry")}
        </button>
      </div>
    </Container>
  );
}
