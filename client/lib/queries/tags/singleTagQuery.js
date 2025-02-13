import { gql } from "graphql-request";
export const SINGLE_TAG_QUERY = gql`
  query singleTagQuery($slug: String!, $start: Int!, $limit: Int!) {
    articlesCountBasedOnTagOrCategory(
      where: { tags: { slug: $slug }, published_at_null: false }
    )
    tags(where: { slug: $slug }, publicationState: LIVE) {
      name
      slug
      articles(sort: "published_at:DESC", start: $start, limit: $limit) {
        id
        title
        slug
        image_cover {
          alternativeText
          url
          width
          height
        }
      }
    }
  }
`;
