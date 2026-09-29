import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Картинки идут через собственный прокси /api/iiif (он добавляет заголовок
    // AIC-User-Agent, без которого Cloudflare на artic.edu отдаёт challenge),
    // а IIIF уже отдаёт изображение нужного размера (см. IMAGE_SIZE) —
    // поэтому серверная оптимизация не нужна.
    unoptimized: true,
  },
  sassOptions: {
    loadPaths: [path.join(process.cwd(), "src")],
  },
};

export default withNextIntl(nextConfig);
