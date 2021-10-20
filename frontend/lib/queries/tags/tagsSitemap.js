import { gql } from 'graphql-request';
export const TAGS_SITEMAP = gql`
  query {
    tags {
      id
      name
      slug
      createdAt
    }
  }
`;
