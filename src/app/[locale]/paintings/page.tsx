import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PaintingsListPage } from "@/views/paintings-list";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "paintingsList" });
  return { title: t("title") };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PaintingsListPage />;
}
