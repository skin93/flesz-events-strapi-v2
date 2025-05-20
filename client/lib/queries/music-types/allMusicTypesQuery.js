import { gql } from "graphql-request";
export const ALL_MUSIC_TYPES_QUERY = gql`
  query {
    musicTypes {
      name
    }
  }
`;
