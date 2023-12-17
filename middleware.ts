import createMiddleware from "next-intl/middleware";
import { locales, pathnames } from "./navigation";

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  pathnames,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // However, match all pathnames within `/users`, optionally with a locale prefix
    "/([\\w-]+)?/users/(.+)",
  ],
};
