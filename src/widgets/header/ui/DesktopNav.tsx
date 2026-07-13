"use client";

import { useTranslations } from "next-intl";
import { NAV_ITEMS, MATURE_SECTION_HREF } from "@/shared/config/site";
import { NavLink } from "./NavLink";
import styles from "./DesktopNav.module.scss";

export function DesktopNav() {
  const t = useTranslations("nav");
  const tMenu = useTranslations("menu");

  return (
    <nav className={styles.nav} aria-label={tMenu("mainNavLabel")}>
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.href} href={item.href} label={t(item.labelKey)} />
      ))}
      <NavLink href={MATURE_SECTION_HREF} label={t("mature")} className={styles.mature} />
    </nav>
  );
}
