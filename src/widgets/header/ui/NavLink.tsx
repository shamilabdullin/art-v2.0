"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils/cn";
import styles from "./NavLink.module.scss";

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function NavLink({ href, label, onClick, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link href={href} onClick={onClick} className={cn(styles.link, isActive && styles.linkActive, className)}>
      {label}
    </Link>
  );
}
