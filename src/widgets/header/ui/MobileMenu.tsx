"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { NAV_ITEMS, MATURE_SECTION_HREF } from "@/shared/config/site";
import { SearchForm } from "@/features/search-artworks";
import { ThemeToggle } from "@/features/theme-toggle";
import { LanguageSwitcher } from "@/features/language-switcher";
import { useMobileMenuStore } from "../model/menuStore";
import { NavLink } from "./NavLink";
import styles from "./MobileMenu.module.scss";

export function MobileMenu() {
  const t = useTranslations("nav");
  const tMenu = useTranslations("menu");
  const isOpen = useMobileMenuStore((state) => state.isOpen);
  const close = useMobileMenuStore((state) => state.close);
  const pathname = usePathname();

  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={close} />
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label={tMenu("dialogLabel")}>
        <SearchForm />
        <nav className={styles.nav} aria-label={tMenu("mobileNavLabel")}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={t(item.labelKey)}
              className={styles.navLink}
              onClick={close}
            />
          ))}
          <NavLink
            href={MATURE_SECTION_HREF}
            label={t("mature")}
            className={`${styles.navLink} ${styles.mature}`}
            onClick={close}
          />
        </nav>
        <div className={styles.footer}>
          <div className={styles.footerRow}>
            <span>{tMenu("themeLabel")}</span>
            <ThemeToggle />
          </div>
          <div className={styles.footerRow}>
            <span>{tMenu("languageLabel")}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
