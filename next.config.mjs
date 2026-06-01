import withPlaiceholder from "@plaiceholder/next";
import withNextIntl from "next-intl/plugin";

// const withNextIntl = require("next-intl/plugin")(
//   // This is the default (also the `src` folder is supported out of the box)
//   "./i18n.ts"
// );
/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  output: "standalone",
  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        hostname: "skillicons.dev",
      },
      {
        hostname: "static.frontendmasters.com"
      }
    ],
  },
};
const NextIntlconfigs = withNextIntl("./i18n.ts");
export default NextIntlconfigs(withPlaiceholder(nextConfig));
