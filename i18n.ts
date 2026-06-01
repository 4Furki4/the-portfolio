import { getRequestConfig } from "next-intl/server";
import { locales } from "./navigation";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = locales.includes(requested as any) ? requested! : "en";

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
