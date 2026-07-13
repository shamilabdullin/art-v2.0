import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { QueryProvider } from "../providers/QueryProvider";
import { ThemeInitScript } from "@/shared/lib/theme/ThemeInitScript";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { SITE_NAME } from "@/shared/config/site";
import { routing } from "@/i18n/routing";
import "../globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });

  return {
    title: {
      default: SITE_NAME,
      template: `%s · ${SITE_NAME}`,
    },
    description: t("description"),
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    // suppressHydrationWarning: ThemeInitScript выставляет data-theme на <html>
    // синхронно до гидратации, чтобы избежать мигания темы (FOUC) — это ожидаемое
    // расхождение с серверной разметкой, а не баг.
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeInitScript />
      </head>
      <body>
        <NextIntlClientProvider>
          <QueryProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
