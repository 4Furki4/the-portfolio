export type LocalizedRootHref = "/" | "/projects" | "/about";

export function getLocalizedHref(href: LocalizedRootHref, locale: string) {
  if (locale !== "tr") return href;
  if (href === "/") return "/tr";
  if (href === "/about") return "/tr/hakkimda";
  return "/tr/projeler";
}

export function getProjectHref(locale: string, endpoint: string) {
  return locale === "tr" ? `/tr/projeler/${endpoint}` : `/projects/${endpoint}`;
}

export function getLocaleSwitchPath(pathname: string) {
  if (pathname === "/tr") return "/";
  if (pathname === "/tr/hakkimda") return "/about";
  if (pathname === "/tr/projeler") return "/projects";
  if (pathname.startsWith("/tr/projeler/")) {
    return pathname.replace("/tr/projeler/", "/projects/");
  }
  if (pathname.startsWith("/tr/")) return pathname.replace(/^\/tr/, "") || "/";

  if (pathname === "/") return "/tr";
  if (pathname === "/about") return "/tr/hakkimda";
  if (pathname === "/projects") return "/tr/projeler";
  if (pathname.startsWith("/projects/")) {
    return pathname.replace("/projects/", "/tr/projeler/");
  }
  return `/tr${pathname}`;
}

export function isActivePath(
  pathname: string,
  href: LocalizedRootHref,
  locale: string,
) {
  const localizedHref = getLocalizedHref(href, locale);
  if (href === "/") return pathname === localizedHref;
  return pathname === localizedHref || pathname.startsWith(`${localizedHref}/`);
}
