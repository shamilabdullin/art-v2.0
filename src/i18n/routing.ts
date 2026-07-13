import { defineRouting } from "next-intl/routing";

export const locales = ["ru", "en", "es", "fr", "de"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "ru",
  localePrefix: "as-needed",
});
