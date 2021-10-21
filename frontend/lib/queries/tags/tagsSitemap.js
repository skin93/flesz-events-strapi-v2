import { gql } from 'graphql-request';
export const TAGS_SITEMAP = gql`
  query {
    tags(sort: "updatedAt:DESC") {
      id
      name
      slug
      updatedAt
    }
  }
`;
