import { Skeleton } from "@/shared/ui";
import styles from "./PaintingListRow.module.scss";

export function PaintingListRowSkeleton() {
  return (
    <div className={styles.row}>
      <Skeleton className={styles.thumb} />
      <div className={styles.texts}>
        <Skeleton style={{ width: 220, height: 15 }} />
        <Skeleton style={{ width: 140, height: 13 }} />
      </div>
    </div>
  );
}
