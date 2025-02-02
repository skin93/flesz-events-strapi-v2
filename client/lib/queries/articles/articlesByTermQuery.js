import { gql } from "graphql-request";
export const ARTICLES_BY_TERM_QUERY = gql`
  query articlesByTermQuery($term: String!) {
    termInContent: articles(
      publicationState: LIVE
      sort: "published_at:DESC"
      where: { content_contains: $term }
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
    termInTitle: articles(
      publicationState: LIVE
      sort: "published_at:DESC"
      where: { title_contains: $term }
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
