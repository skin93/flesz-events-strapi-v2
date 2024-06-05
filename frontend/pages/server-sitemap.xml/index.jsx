import { fetcher } from "@/lib/fetcher";
import { ARTICLES_SITEMAP } from "@/lib/queries/articles/articlesSitemap";
import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const { articles } = await fetcher(ARTICLES_SITEMAP);

  const transformedArticles = articles?.map((page) => ({
    loc: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${page.slug}`,
    lastmod: page.updatedAt || undefined,
    priority: 0.9,
    changefreq: "daily",
  }));

  const fields = [...transformedArticles];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
const ServerSitemap = () => {
  return null;
};

export default ServerSitemap;
