import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MaturePage } from "@/views/mature";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "mature" });
  return { title: t("pageTitle"), robots: { index: false, follow: false } };
}

export default async function Page({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const pageNumber = Number(page) > 0 ? Number(page) : 1;
  return <MaturePage page={pageNumber} />;
}
