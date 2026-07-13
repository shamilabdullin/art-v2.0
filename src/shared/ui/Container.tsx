import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils/cn";
import styles from "./Container.module.scss";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn(styles.container, className)}>{children}</div>;
}
