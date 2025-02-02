import { gql } from "graphql-request";
export const LATEST_FESTIVALS_QUERY = gql`
  query latestFestivalsQuery($start: Int!, $limit: Int!) {
    festivals: articles(
      publicationState: LIVE
      start: $start
      limit: $limit
      sort: "published_at:DESC"
      where: { category: { slug: "festiwale" } }
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
