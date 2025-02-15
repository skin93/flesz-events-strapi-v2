import { getArticlesSitemap } from "@/lib/data/articles";
import { connection } from "next/server";

export default async function sitemap() {
  await connection();
  const { articles } = await getArticlesSitemap();
  const articlesEntries = articles.map(({ slug, updatedAt }) => ({
    url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${slug}`,
    lastModified: new Date(updatedAt),
    changeFrequency: "daily",
    priority: 0.7,
  }));
  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/festival-map`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...articlesEntries,
  ];
}
