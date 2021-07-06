import { gql } from 'graphql-request';
export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      name
      slug
      description
    }
    tagsConnection {
      aggregate {
        count
      }
    }
  }
`;
