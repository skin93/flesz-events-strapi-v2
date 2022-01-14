import { fetcher } from "@/lib/fetcher";
import { SINGLE_ARTICLE_QUERY } from "@/lib/queries/articles/singleArticleQuery";

export default async function handler(req, res) {
  if (req.query.secret !== process.env.STRAPI_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const slug = req.query.slug;
  const article = await fetcher(SINGLE_ARTICLE_QUERY, {
    slug,
  });
  if (!article) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  res.setPreviewData(article, { maxAge: 1 * 10 });

  res.writeHead(307, { Location: `/articles/${slug}` });
  res.end();
}
