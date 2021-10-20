import { gql } from 'graphql-request';
export const CATEGORIES_SITEMAP = gql`
  query {
    categories {
      id
      name
      slug
      createdAt
    }
  }
`;
