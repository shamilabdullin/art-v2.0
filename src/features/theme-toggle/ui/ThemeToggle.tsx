"use client";

import { useTranslations } from "next-intl";
import { useThemeStore } from "@/shared/lib/theme/themeStore";
import styles from "./ThemeToggle.module.scss";

export function ThemeToggle() {
  const t = useTranslations("theme");
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button type="button" className={styles.button} onClick={toggleTheme} aria-label={t("toggle")}>
      <svg
        className={`${styles.icon} ${styles.iconSun}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        className={`${styles.icon} ${styles.iconMoon}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
