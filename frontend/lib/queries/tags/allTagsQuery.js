import { gql } from 'graphql-request';
export const ALL_TAGS_QUERY = gql`
  query {
    tags(sort: "name:ASC", publicationState: LIVE) {
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
