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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: `${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(self), microphone=(), camera=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Server-Timing",
            value: "app; dur=100",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
