import { Skeleton } from "@/shared/ui";
import styles from "./PaintingCardSkeleton.module.scss";

export function PaintingCardSkeleton() {
  return (
    <div className={styles.wrapper}>
      <Skeleton className={styles.image} />
      <Skeleton className={styles.title} />
      <Skeleton className={styles.artist} />
    </div>
  );
}
