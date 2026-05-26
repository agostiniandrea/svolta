import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import path from "path";

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
    // Sanity's pre-built ESM chunks import `useEffectEvent` from React, which
    // Webpack 5's strict named-export check can't resolve from React's CJS bundle.
    // `javascript/auto` disables that check for Sanity files.
    webpackConfig.module.rules.push({
      test: /node_modules\/(sanity|@sanity\/[^/]+)\/lib\/.*\.js$/,
      type: "javascript/auto",
    });

    // Sanity Studio calls useEffectEvent at runtime. Next.js browser bundles
    // resolve React to its own compiled copy (next/dist/compiled/react) which
    // doesn't expose that API. Redirect to node_modules/react (v19, which does).
    if (!options.isServer) {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        react: path.resolve("node_modules/react"),
        "react-dom": path.resolve("node_modules/react-dom"),
      };
    }

    if (typeof config.webpack === "function") {
      return config.webpack(webpackConfig, options);
    }
    return webpackConfig;
  },
});

export default withNextIntl(withSanityCompat(nextConfig));
