module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
