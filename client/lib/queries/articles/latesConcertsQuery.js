import { gql } from "graphql-request";
export const LATEST_CONCERTS_QUERY = gql`
  query latestConcertsQuery($start: Int!, $limit: Int!) {
    concerts: articles(
      publicationState: LIVE
      start: $start
      limit: $limit
      sort: "published_at:DESC"
      where: { category: { slug: "koncerty" } }
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
