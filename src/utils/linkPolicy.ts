const HOME_HREF = "/";

export const getAllowedHref = (href: string) => {
  const normalizedHref = href.trim();

  if (normalizedHref === HOME_HREF || normalizedHref.startsWith("#")) {
    return normalizedHref;
  }

  return HOME_HREF;
};

export const shouldUseExternalTarget = (href: string, external = false) =>
  external && getAllowedHref(href) === href;
