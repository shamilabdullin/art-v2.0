import { setRequestLocale } from "next-intl/server";
import { HomePage } from "@/views/home";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePage />;
}
