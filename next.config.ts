import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.artic.edu",
        pathname: "/iiif/**",
      },
    ],
    // IIIF уже отдаёт изображение нужного размера по URL (см. IMAGE_SIZE),
    // поэтому серверная оптимизация не нужна. Важнее, что CDN artic.edu стоит
    // за Cloudflare bot-protection и блокирует именно серверные запросы —
    // без unoptimized картинку будет грузить наш сервер (и может словить 403),
    // а так запрос идёт напрямую из браузера пользователя, как обычный <img>.
    unoptimized: true,
  },
  sassOptions: {
    loadPaths: [path.join(process.cwd(), "src")],
  },
};

export default withNextIntl(nextConfig);
