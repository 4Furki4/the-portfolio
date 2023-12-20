import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";

export const locales = ["en", "tr"] as const;

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  "/": "/",

  // If locales use different paths, you can
  // specify each external path per locale.
  "/about": {
    en: "/about",
    tr: "/hakkimda",
  },
  "/about#guestbook": {
    en: "/about#guestbook",
    tr: "/hakkimda#ziyaretcidefteri",
  },
  "/projects": {
    en: "/projects",
    tr: "/projeler",
  },
  // Dynamic params are supported via square brackets
  "/projects/[endpoint]": {
    en: "/projects/[endpoint]",
    tr: "/projeler/[endpoint]",
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, pathnames });
