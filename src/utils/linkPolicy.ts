export const getAllowedHref = (href: string) => {
  return href.trim();
};

export const shouldUseExternalTarget = (href: string, external = false) =>
  external && getAllowedHref(href) === href;
