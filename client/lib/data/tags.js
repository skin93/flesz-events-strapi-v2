import { grafbase } from "../graphql";
import { ALL_TAGS_QUERY } from "../queries/tags/allTagsQuery";
import { SINGLE_TAG_META_QUERY } from "../queries/tags/singleTagMetaQuery";
import { SINGLE_TAG_QUERY } from "../queries/tags/singleTagQuery";

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

export async function getTagMeta(slug) {
  const res = await grafbase.request(SINGLE_TAG_META_QUERY, {
    slug,
  });
  return { seo: res.tags[0] };
}
