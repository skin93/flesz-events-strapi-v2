import { grafbase } from "../graphql";
import { CATEGORY_QUERY } from "../queries/categories/categoryQuery";
import { SINGLE_CATEGORY_QUERY } from "../queries/categories/singleCategoryQuery";

export async function getArticlesByCategory(slug, start, limit) {
  try {
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
  } catch (error) {
    console.error(error);
  }
}

export async function getCategory(slug) {
  try {
    const res = await grafbase.request(CATEGORY_QUERY, {
      slug,
    });
    return { category: res.categories[0] };
  } catch (error) {
    console.error(error);
  }
}
