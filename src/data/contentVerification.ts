import type { VerificationItem } from "@/types/business";

export const contentVerification: VerificationItem[] = [
  {
    key: "logo-quality",
    title: "Kvalitet logotipa",
    status: "needs-production-confirmation",
    note: "Dostupan je raster logo 150×150 px u JPEG formatu bez transparentne pozadine."
  },
  {
    key: "membership-accuracy",
    title: "Aktuelnost članarina",
    status: "needs-production-confirmation",
    note: "Prikazane su redovne cijene iz dostavljenog opisa, ali datum posljednje potvrde nije poznat."
  },
  {
    key: "hours-accuracy",
    title: "Aktuelnost radnog vremena",
    status: "needs-production-confirmation",
    note: "Prikazan je redovni raspored 10:00–22:00 radnim danima i 10:00–20:00 vikendom bez prazničnih izuzetaka."
  },
  {
    key: "free-first-training",
    title: "Besplatan prvi trening",
    status: "not-confirmed",
    note: "Ponuda nije prikazana jer nije potvrđeno da je i dalje aktuelna."
  },
  {
    key: "equipment-count",
    title: "Inventar opreme",
    status: "needs-production-confirmation",
    note: "Na sajtu su prikazane samo potvrđene stavke: Technogym Selection linija i četiri trake za trčanje."
  },
  {
    key: "original-photos",
    title: "Originalne fotografije prostora",
    status: "not-confirmed",
    note: "Nisu dostavljene čiste fotografije bez promotivnih tekstualnih overlay elemenata."
  },
  {
    key: "map-pin",
    title: "Mapa i ulaz",
    status: "not-confirmed",
    note: "Koristi se tekstualni link ka adresi bez koordinata, parking informacija i opisa ulaza."
  },
  {
    key: "contact-data",
    title: "Kontakt podaci",
    status: "needs-production-confirmation",
    note: "Telefon, Instagram i adresa su centralizovani, ali ih prije produkcije treba još jednom potvrditi."
  },
  {
    key: "hygiene-wording",
    title: "Formulacija pravila higijene",
    status: "needs-production-confirmation",
    note: "Korišćena je kratka neutralna formulacija bez dodatnih kućnih pravila."
  },
  {
    key: "public-site-url",
    title: "Produkcioni domen",
    status: "not-confirmed",
    note: "Canonical URL, sitemap i structured data očekuju vrijednost build-time varijable PUBLIC_SITE_URL."
  }
];
