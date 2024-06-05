module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_DOMAIN || "https://fleszevents.pl",
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml", "/search", "/tags/", "/categories/"], // <= exclude here
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/categories/", "/tags/"],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_APP_DOMAIN}/server-sitemap.xml`, // <==== Add here
    ],
  },
};
