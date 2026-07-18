import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  const isProductionLike =
    Boolean(siteUrl) &&
    !siteUrl.includes("localhost") &&
    !siteUrl.includes("127.0.0.1");

  const body = isProductionLike
    ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};
