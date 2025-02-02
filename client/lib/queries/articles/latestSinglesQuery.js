import { gql } from "graphql-request";
export const LATEST_SINGLES_QUERY = gql`
  query latestSinglesQuery($start: Int!, $limit: Int!) {
    singles: articles(
      publicationState: LIVE
      start: $start
      limit: $limit
      sort: "published_at:DESC"
      where: { category: { slug: "single" } }
    ) {
      id
      title
      slug
      createdAt
      image_cover {
        alternativeText
        url
        width
        height
      }
      category {
        name
        slug
      }
    }
  }
`;
