import { gql } from "graphql-request";
export const SINGLE_CATEGORY_QUERY = gql`
  query singleCategoryQuery($slug: String!, $start: Int!, $limit: Int!) {
    articlesCountBasedOnTagOrCategory(
      where: { category: { slug: $slug }, published_at_null: false }
    )
    categories(where: { slug: $slug }, publicationState: LIVE) {
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
