import { business } from "@/data/business";
import { navigationItems } from "@/data/navigation";
import type { PageMeta } from "@/types/business";

const rawSiteUrl = import.meta.env.PUBLIC_SITE_URL?.trim() ?? "";
export const canonicalBaseUrl = rawSiteUrl.replace(/\/$/, "");

export const siteConfig = {
  name: business.name,
  navigationItems,
  socialImagePath: "/og/techno-gym-og.svg",
  ogLocale: "sr_BA"
};

export const pageMeta: Record<
  "home" | "equipment" | "memberships" | "hours" | "contact" | "404",
  PageMeta
> = {
  home: {
    title: "Techno Gym Bratunac | Teretana i Technogym oprema",
    description:
      "Techno Gym Bratunac na Trgu Miloša Obilića: originalna Technogym oprema, Selection sprave, cardio zona, cijene članarina i radno vrijeme."
  },
  equipment: {
    title: "Oprema i prostor | Techno Gym Bratunac",
    description:
      "Pogledajte Technogym Selection sprave, cardio zonu sa četiri trake za trčanje i prostor Techno Gyma u Bratuncu."
  },
  memberships: {
    title: "Cijene članarina | Techno Gym Bratunac",
    description:
      "Redovne cijene mjesečnih, tromjesečnih, šestomjesečnih i godišnjih članarina za Techno Gym Bratunac."
  },
  hours: {
    title: "Radno vrijeme i pravila | Techno Gym Bratunac",
    description:
      "Provjerite radno vrijeme Techno Gyma u Bratuncu i praktična pravila o čistoj obući i opremi za trening."
  },
  contact: {
    title: "Kontakt i lokacija | Techno Gym Bratunac",
    description:
      "Telefon, adresa, radno vrijeme i Instagram profil Techno Gyma na Trgu Miloša Obilića u Bratuncu."
  },
  "404": {
    title: "Stranica nije pronađena | Techno Gym Bratunac",
    description:
      "Tražena stranica ne postoji. Vrati se na početnu, provjeri članarine ili otvori kontakt podatke Techno Gyma."
  }
};

export const toAbsoluteUrl = (pathname: string) => {
  if (!canonicalBaseUrl) {
    return undefined;
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${canonicalBaseUrl}${normalizedPath}`;
};
