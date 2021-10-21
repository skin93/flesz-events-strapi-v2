import { fetcher } from '@/lib/fetcher';
import { ARTICLES_SITEMAP } from '@/lib/queries/articles/articlesSitemap';
import { CATEGORIES_SITEMAP } from '@/lib/queries/categories/categoriesSitemap';
import { TAGS_SITEMAP } from '@/lib/queries/tags/tagsSitemap';
import { getServerSideSitemap } from 'next-sitemap';

export const getServerSideProps = async (ctx) => {
  const { articles } = await fetcher(ARTICLES_SITEMAP);

  const { categories } = await fetcher(CATEGORIES_SITEMAP);

  const { tags } = await fetcher(TAGS_SITEMAP);

  const transformedArticles = articles?.map((page) => ({
    loc: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${page.slug}`,
    lastmod: page.updatedAt || undefined,
    priority: 0.9,
    changefreq: 'daily',
  }));

  const transformedCategories = categories?.map((page) => ({
    loc: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/categories/${page.slug}`,
    lastmod: page.updatedAt || undefined,
    priority: 0.5,
    changefreq: 'daily',
  }));

  const transformedTags = tags?.map((page) => ({
    loc: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/tags/${page.slug}`,
    lastmod: page.updatedAt || undefined,
    priority: 0.5,
    changefreq: 'daily',
  }));

  const fields = [
    ...transformedArticles,
    ...transformedCategories,
    ...transformedTags,
  ];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
const ServerSitemap = () => {
  return null;
};

export default ServerSitemap;
