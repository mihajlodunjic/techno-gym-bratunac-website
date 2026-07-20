export const getAllowedHref = (href: string) => {
  const normalizedHref = href.trim();

  if (normalizedHref === "/" || normalizedHref.startsWith("#")) {
    return normalizedHref;
  }

  return "/";
};

export const shouldUseExternalTarget = (href: string, external = false) =>
  external && getAllowedHref(href) === href;
