import { grafbase } from "../graphql";
import { SINGLE_CATEGORY_META_QUERY } from "../queries/categories/singleCategoryMetaQuery";
import { SINGLE_CATEGORY_QUERY } from "../queries/categories/singleCategoryQuery";

export async function getArticlesByCategory(slug, start, limit) {
  const res = await grafbase.request(SINGLE_CATEGORY_QUERY, {
    slug,
    start,
    limit,
  });

  return {
    category: res.categories[0],
    articles: res.categories[0].articles,
    articlesCountBasedOnTagOrCategory: res.articlesCountBasedOnTagOrCategory,
  };
}

export async function getCategoryMeta(slug) {
  const res = await grafbase.request(SINGLE_CATEGORY_META_QUERY, {
    slug,
  });
  return { seo: res.categories[0] };
}
