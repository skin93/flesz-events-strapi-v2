import { gql } from "graphql-request";
export const CATEGORY_QUERY = gql`
  query categoryQuery($slug: String!) {
    categories(where: { slug: $slug }, publicationState: LIVE) {
      name
      description
      slug
    }
  }
`;
