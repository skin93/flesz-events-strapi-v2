import { grafbase } from "../graphql";
import { ALL_TAGS_QUERY } from "../queries/tags/allTagsQuery";
import { SINGLE_TAG_QUERY } from "../queries/tags/singleTagQuery";
import { TAG_QUERY } from "../queries/tags/tagQuery";

export async function getArticlesByTag(slug, start, limit) {
  try {
    const res = await grafbase.request(SINGLE_TAG_QUERY, {
      slug,
      start,
      limit,
    });

    return {
      tag: res.tags[0],
      articles: res.tags[0].articles,
      articlesCountBasedOnTagOrCategory: res.articlesCountBasedOnTagOrCategory,
    };
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export async function getAllTags(start, limit) {
  try {
    const res = await grafbase.request(ALL_TAGS_QUERY, { start, limit });
    return {
      tags: res.tags,
      totalCount: res.tagsConnection.aggregate.totalCount,
    };
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export async function getTag(slug) {
  try {
    const res = await grafbase.request(TAG_QUERY, {
      slug,
    });
    return { tag: res.tags[0] };
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
