import { gql } from "graphql-request";
export const LATEST_NEWS_QUERY = gql`
  query latestNewsQuery($start: Int!, $limit: Int!) {
    news: articles(
      publicationState: LIVE
      start: $start
      limit: $limit
      sort: "published_at:DESC"
      where: { category: { slug: "newsy" } }
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
