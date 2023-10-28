import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "skillicons.dev",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
