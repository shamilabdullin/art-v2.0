import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArtistDetailsPage } from "@/views/artist-details";
import { getArtist } from "@/entities/artist";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  try {
    const { data } = await getArtist(id, { revalidate });
    return { title: data.title };
  } catch {
    const t = await getTranslations({ locale, namespace: "artists" });
    return { title: t("titleFallback") };
  }
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { page } = await searchParams;
  const pageNumber = Number(page) > 0 ? Number(page) : 1;
  return <ArtistDetailsPage id={id} page={pageNumber} />;
}
