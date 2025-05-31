import { grafbase } from "../graphql";
import { ALL_TAGS_QUERY } from "../queries/tags/allTagsQuery";
import { SINGLE_TAG_QUERY } from "../queries/tags/singleTagQuery";
import { TAG_QUERY } from "../queries/tags/tagQuery";

export async function getArticlesByTag(slug, start, limit) {
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
}

export async function getAllTags(start, limit) {
  const res = await grafbase.request(ALL_TAGS_QUERY, { start, limit });
  return {
    tags: res.tags,
    totalCount: res.tagsConnection.aggregate.totalCount,
  };
}

export async function getTag(slug) {
  const res = await grafbase.request(TAG_QUERY, {
    slug,
  });
  return { tag: res.tags[0] };
}
