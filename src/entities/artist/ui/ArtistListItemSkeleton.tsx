import { Skeleton } from "@/shared/ui";
import styles from "./ArtistListItem.module.scss";

export function ArtistListItemSkeleton() {
  return (
    <div className={styles.item}>
      <Skeleton style={{ width: "60%", height: 16 }} />
      <Skeleton style={{ width: 60, height: 14 }} />
    </div>
  );
}
