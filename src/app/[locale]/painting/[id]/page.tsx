import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PaintingDetailsPage } from "@/views/painting-details";
import { getArtwork } from "@/entities/painting";

// Полноценный SSG/ISR через generateStaticParams не используется: при notFound()
// на статически закэшированной странице self-hosted Next.js отдаёт 200 вместо 404
// (известное ограничение, актуально не только на Vercel). Вместо этого страница
// рендерится динамически на каждый запрос, а актуальность данных обеспечивает
// revalidate на уровне fetch — тот же эффект ISR, но с корректным статусом ответа.
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  try {
    const { data } = await getArtwork(id, { revalidate });
    return {
      title: data.title,
      description: data.artist_display ?? undefined,
    };
  } catch {
    const t = await getTranslations({ locale, namespace: "painting" });
    return { title: t("titleFallback") };
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <PaintingDetailsPage id={id} />;
}
