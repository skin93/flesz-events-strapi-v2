import { gql } from "graphql-request";
export const SEARCH_ARTICLES_QUERY = gql`
  query searchArticlesQuery($start: Int!, $limit: Int!, $q: String!) {
    articles(
      publicationState: LIVE
      start: $start
      limit: $limit
      sort: "published_at:DESC"
      where: { title_contains: $q }
    ) {
      id
      title
      slug
      createdAt
      image_cover {
        alternativeText
        url
      }
      category {
        name
        slug
      }
    }
    articlesConnection(where: { published_at_null: false }) {
      aggregate {
        count
      }
    }
  }
`;
