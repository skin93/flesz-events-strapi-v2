import { gql } from "graphql-request";
export const ALL_TAGS_QUERY = gql`
  query {
    tags(sort: "slug:asc") {
      id
      name
      slug
    }
  }
`;
