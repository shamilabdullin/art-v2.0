"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { useSearchNavigation } from "../model/useSearchNavigation";
import styles from "./SearchForm.module.scss";

function SearchFormFields() {
  const t = useTranslations("search");
  const { value, setValue, navigateNow } = useSearchNavigation();

  return (
    <form
      role="search"
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        navigateNow();
      }}
    >
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={t("placeholder")}
        aria-label={t("placeholder")}
        className={styles.input}
      />
    </form>
  );
}

export function SearchForm() {
  return (
    <Suspense fallback={<div className={styles.form} />}>
      <SearchFormFields />
    </Suspense>
  );
}
