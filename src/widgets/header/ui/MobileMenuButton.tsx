"use client";

import { useTranslations } from "next-intl";
import { useMobileMenuStore } from "../model/menuStore";
import styles from "./MobileMenuButton.module.scss";

export function MobileMenuButton() {
  const t = useTranslations("menu");
  const isOpen = useMobileMenuStore((state) => state.isOpen);
  const toggle = useMobileMenuStore((state) => state.toggle);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggle}
      aria-label={isOpen ? t("close") : t("open")}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      ) : (
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  );
}
