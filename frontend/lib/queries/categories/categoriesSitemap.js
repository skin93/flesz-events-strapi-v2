import { gql } from 'graphql-request';
export const CATEGORIES_SITEMAP = gql`
  query {
    categories(sort: "updatedAt:DESC") {
      id
      name
      slug
      updatedAt
    }
  }
`;
