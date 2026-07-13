import type { MetaRow } from "../lib/buildMetaRows";
import styles from "./PaintingMeta.module.scss";

export function PaintingMeta({ rows }: { rows: MetaRow[] }) {
  return (
    <dl className={styles.list}>
      {rows.map((row) => (
        <div key={row.label} className={styles.row}>
          <dt className={styles.label}>{row.label}</dt>
          <dd className={styles.value}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
