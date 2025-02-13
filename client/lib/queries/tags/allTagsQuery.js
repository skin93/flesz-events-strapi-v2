import { gql } from "graphql-request";
export const ALL_TAGS_QUERY = gql`
  query allTagsQuery($start: Int!, $limit: Int!) {
    tags(start: $start, limit: $limit, sort: "slug:asc") {
      id
      slug
      name
    }
    tagsConnection {
      aggregate {
        totalCount
      }
    }
  }
`;
