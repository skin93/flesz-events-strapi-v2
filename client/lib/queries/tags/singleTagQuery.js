import { gql } from "graphql-request";
export const SINGLE_TAG_QUERY = gql`
  query singleTagQuery($slug: String!) {
    tags(where: { slug: $slug }, publicationState: LIVE) {
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
