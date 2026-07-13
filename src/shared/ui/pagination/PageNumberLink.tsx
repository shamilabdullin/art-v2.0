import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils/cn";
import styles from "./Pagination.module.scss";

interface PageNumberLinkProps {
  page: number;
  href: string;
  isCurrent: boolean;
}

export function PageNumberLink({ page, href, isCurrent }: PageNumberLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      className={cn(styles.pageLink, isCurrent && styles.pageLinkActive)}
    >
      {page}
    </Link>
  );
}
