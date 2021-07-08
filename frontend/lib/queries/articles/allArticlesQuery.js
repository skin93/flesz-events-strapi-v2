import { gql } from 'graphql-request';
export const ALL_ARTICLES_QUERY = gql`
  query allArticlesQuery($start: Int!, $limit: Int!) {
    articles(
      publicationState: LIVE
      start: $start
      limit: $limit
      sort: "published_at:DESC"
    ) {
      id
      title
      slug
      image_cover {
        alternativeText
        url
      }
    }
    articlesConnection {
      aggregate {
        count
      }
    }
  }
`;
