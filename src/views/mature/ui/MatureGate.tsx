"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useHasMounted } from "@/shared/lib/hooks/useHasMounted";
import { useMatureGateStore } from "../model/useMatureGateStore";
import styles from "./MatureGate.module.scss";

/**
 * До монтирования на клиенте всегда показывает предупреждение — это и есть
 * серверный HTML, поэтому гидратация не расходится. Реальное значение из
 * localStorage (zustand persist) проверяем только после монтирования.
 */
export function MatureGate({ children }: { children: ReactNode }) {
  const t = useTranslations("mature");
  const mounted = useHasMounted();
  const isConfirmed = useMatureGateStore((state) => state.isConfirmed);
  const confirm = useMatureGateStore((state) => state.confirm);

  if (mounted && isConfirmed) {
    return children;
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.badge}>18+</span>
      <p className={styles.title}>{t("gateTitle")}</p>
      <p className={styles.description}>{t("gateDescription")}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.confirmButton} onClick={confirm}>
          {t("confirmButton")}
        </button>
        <Link href="/" className={styles.declineLink}>
          {t("declineButton")}
        </Link>
      </div>
    </div>
  );
}
