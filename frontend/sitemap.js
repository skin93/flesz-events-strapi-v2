module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_DOMAIN || 'https://flesz.events',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml', '/preview'], // <= exclude here
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_APP_DOMAIN}/server-sitemap.xml`, // <==== Add here
    ],
  },
};
