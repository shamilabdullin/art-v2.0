"use client";

import { useTranslations } from "next-intl";
import { Spinner } from "@/shared/ui";
import styles from "./FilterInput.module.scss";

interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export function FilterInput({ value, onChange, isLoading }: FilterInputProps) {
  const t = useTranslations("filter");
  const tCommon = useTranslations("common");

  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("placeholder")}
        aria-label={t("placeholder")}
        className={styles.input}
      />
      {isLoading ? <Spinner className={styles.spinner} label={tCommon("loading")} /> : null}
    </div>
  );
}
