import { gql } from 'graphql-request';
export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
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
