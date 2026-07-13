import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/shared/ui";
import { SITE_NAME } from "@/shared/config/site";
import styles from "./Logo.module.scss";

export function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      <LogoMark size={26} className={styles.mark} />
      <span>{SITE_NAME}</span>
    </Link>
  );
}
