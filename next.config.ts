import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

const withSanityCompat = (config: NextConfig): NextConfig => ({
  ...config,
  webpack(webpackConfig, options) {
    // Sanity ships pre-built ESM chunks that import `useEffectEvent` from React.
    // Webpack 5 strict ESM named-export checking fails to detect it from React's
    // CJS entry. Marking those chunks as `javascript/auto` disables the strict check.
    // Sanity and its satellite packages (@sanity/*) ship pre-built ESM files
    // that import `useEffectEvent` from React. Webpack 5's strict ESM named-export
    // check can't find it in React's CJS bundle. `javascript/auto` disables that check.
    webpackConfig.module.rules.push({
      test: /node_modules\/(sanity|@sanity\/[^/]+)\/lib\/.*\.js$/,
      type: "javascript/auto",
    });

    if (typeof config.webpack === "function") {
      return config.webpack(webpackConfig, options);
    }
    return webpackConfig;
  },
});

export default withNextIntl(withSanityCompat(nextConfig));
