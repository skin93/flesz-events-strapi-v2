import { gql } from 'graphql-request';
export const ARTICLES_SITEMAP = gql`
  query {
    articles {
      id
      title
      slug
      createdAt
    }
  }
`;
