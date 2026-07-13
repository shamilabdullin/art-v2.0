import { cn } from "@/shared/lib/utils/cn";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  className?: string;
  label?: string;
}

export function Spinner({ className, label }: SpinnerProps) {
  return <div role="status" aria-label={label} className={cn(styles.spinner, className)} />;
}
