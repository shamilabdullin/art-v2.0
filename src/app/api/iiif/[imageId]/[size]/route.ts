import { IIIF_BASE_URL, IIIF_USER_AGENT, IMAGE_SIZE, type ImageSize } from "@/shared/api";

// IIIF-сервер artic.edu стоит за Cloudflare bot-protection: запрос картинки
// напрямую из браузера получает HTML-страницу challenge (403), и браузер
// блокирует её как ERR_BLOCKED_BY_ORB. Запросы с заголовком AIC-User-Agent
// (так API просит представляться клиентов) пропускаются, но <img> не умеет
// слать свои заголовки — поэтому картинки проксируются через этот роут.

const IMAGE_ID_PATTERN = /^[0-9a-f-]{36}$/i;
const ONE_YEAR = 60 * 60 * 24 * 365;

function isImageSize(value: string): value is ImageSize {
  return Object.hasOwn(IMAGE_SIZE, value);
}

export async function GET(_request: Request, ctx: RouteContext<"/api/iiif/[imageId]/[size]">) {
  const { imageId, size } = await ctx.params;

  if (!IMAGE_ID_PATTERN.test(imageId) || !isImageSize(size)) {
    return new Response("Not found", { status: 404 });
  }

  const upstream = await fetch(`${IIIF_BASE_URL}/${imageId}/full/${IMAGE_SIZE[size]},/0/default.jpg`, {
    headers: { "AIC-User-Agent": IIIF_USER_AGENT },
    // Картинки бывают больше лимита Data Cache (2 МБ), кэшируем через Cache-Control.
    cache: "no-store",
  });

  const contentType = upstream.headers.get("content-type") ?? "";
  if (!upstream.ok || !contentType.startsWith("image/")) {
    return new Response("Image unavailable", { status: upstream.status === 404 ? 404 : 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": contentType,
      // s-maxage — чтобы картинку кэшировал и CDN, а не только браузер:
      // иначе каждый новый посетитель снова идёт через сервер к artic.edu.
      "Cache-Control": `public, max-age=${ONE_YEAR}, s-maxage=${ONE_YEAR}, immutable`,
    },
  });
}
