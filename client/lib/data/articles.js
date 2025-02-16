import { grafbase } from "@/lib/graphql";
import { LATEST_ARTICLES_QUERY } from "@/lib/queries/articles/latestArticlesQuery";
import { SINGLE_ARTICLE_QUERY } from "../queries/articles/singleArticleQuery";
import { SINGLE_ARTICLE_META_QUERY } from "../queries/articles/singleArticleMetaQuery";
import { ARTICLES_BY_TERM_QUERY } from "../queries/articles/articlesByTermQuery";
import { ARTICLES_SITEMAP_QUERY } from "../queries/articles/articlesSitemapQuery";

export async function getLatestArticles(start, limit) {
  const res = await grafbase.request(LATEST_ARTICLES_QUERY, {
    start,
    limit,
  });
  return {
    news: res.news[0],
    concerts: res.concerts[0],
    festivals: res.festivals[0],
    singles: res.singles[0],
    promo: res.promo[0],
  };
}

export async function getArticleBySlug(slug) {
  const res = await grafbase.request(SINGLE_ARTICLE_QUERY, {
    slug,
  });
  return { article: res.articles[0] };
}

export async function getArticleMeta(slug) {
  const res = await grafbase.request(SINGLE_ARTICLE_META_QUERY, {
    slug,
  });
  return { seo: res.articles[0] };
}

export async function getArticlesSitemap() {
  const res = await grafbase.request(ARTICLES_SITEMAP_QUERY);
  return { articles: res.articles };
}

export async function getArticlesByTerm(term, start, limit) {
  const res = await grafbase.request(ARTICLES_BY_TERM_QUERY, {
    term,
  });

  return {
    termInContent: res.termInContent,
    termInTitle: res.termInTitle,
  };
}
