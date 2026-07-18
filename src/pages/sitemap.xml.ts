import type { APIRoute } from "astro";

export const prerender = true;

const routes = [
  "/",
  "/oprema-i-prostor/",
  "/clanarine/",
  "/radno-vrijeme-i-pravila/",
  "/kontakt/"
];

export const GET: APIRoute = () => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  const lastModified = new Date().toISOString();

  const urlEntries = routes
    .map((route) => {
      const location = siteUrl ? `${siteUrl}${route}` : route;

      return [
        "<url>",
        `<loc>${location}</loc>`,
        `<lastmod>${lastModified}</lastmod>`,
        "</url>"
      ].join("");
    })
    .join("");

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    "</urlset>"
  ].join("");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
