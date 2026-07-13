import { SearchForm } from "@/features/search-artworks";
import { ThemeToggle } from "@/features/theme-toggle";
import { LanguageSwitcher } from "@/features/language-switcher";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { MobileMenuButton } from "./MobileMenuButton";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Logo />
          <DesktopNav />
        </div>

        <div className={styles.actions}>
          <SearchForm />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <MobileMenuButton />
      </div>

      <MobileMenu />
    </header>
  );
}
