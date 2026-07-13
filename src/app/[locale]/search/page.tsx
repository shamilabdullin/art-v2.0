import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SearchResultsPage } from "@/views/search-results";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { q } = await searchParams;
  const t = await getTranslations({ locale, namespace: "searchPage" });
  return { title: q ? t("metaTitle", { query: q }) : t("metaTitleDefault") };
}

export default async function Page({ searchParams }: PageProps) {
  const { q, page } = await searchParams;
  const pageNumber = Number(page) > 0 ? Number(page) : 1;
  return <SearchResultsPage q={(q ?? "").trim()} page={pageNumber} />;
}
