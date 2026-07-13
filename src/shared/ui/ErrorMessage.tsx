import styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  title: string;
  description: string;
}

export function ErrorMessage({ title, description }: ErrorMessageProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
