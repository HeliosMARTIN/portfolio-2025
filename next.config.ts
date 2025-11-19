import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
};

export default nextConfig;
