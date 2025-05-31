import { gql } from "graphql-request";
export const TAG_QUERY = gql`
  query tagQuery($slug: String!) {
    tags(where: { slug: $slug }, publicationState: LIVE) {
      name
      slug
    }
  }
`;
