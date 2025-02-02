import { gql } from "graphql-request";
export const SINGLE_CATEGORY_QUERY = gql`
  query singleCategoryQuery($slug: String!) {
    categories(where: { slug: $slug }, publicationState: LIVE) {
      name
      slug
      articles(sort: "published_at:DESC") {
        id
        title
        slug
        image_cover {
          alternativeText
          url
          width
          height
        }
        published_at
      }
    }
  }
`;
