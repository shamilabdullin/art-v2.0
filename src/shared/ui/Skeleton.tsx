import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/utils/cn";
import styles from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return <div className={cn(styles.skeleton, className)} style={style} />;
}
