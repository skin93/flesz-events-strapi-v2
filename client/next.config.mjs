/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/festival-map",
        destination: "/",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.PROTOCOL,
        hostname: process.env.STRAPI_HOST,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
