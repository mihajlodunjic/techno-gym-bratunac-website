import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from "node:url";

const siteUrl = process.env.PUBLIC_SITE_URL?.replace(/\/$/, "");

export default defineConfig({
  output: "static",
  site: siteUrl,
  trailingSlash: "always",
  integrations: siteUrl ? [sitemap()] : [],
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  }
});
