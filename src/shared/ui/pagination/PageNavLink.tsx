import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils/cn";
import styles from "./Pagination.module.scss";

interface PageNavLinkProps {
  href?: string;
  disabled: boolean;
  label: string;
}

export function PageNavLink({ href, disabled, label }: PageNavLinkProps) {
  if (disabled || !href) {
    return <span className={cn(styles.navLink, styles.navLinkDisabled)}>{label}</span>;
  }

  return (
    <Link href={href} className={styles.navLink}>
      {label}
    </Link>
  );
}
