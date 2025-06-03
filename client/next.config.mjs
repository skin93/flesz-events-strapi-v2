/** @type {import('next').NextConfig} */
const nextConfig = {
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
