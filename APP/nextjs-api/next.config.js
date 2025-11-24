// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // опции для турбопак если нужно
    },
  },
};

module.exports = withBundleAnalyzer(nextConfig);
