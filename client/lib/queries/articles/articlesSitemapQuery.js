import { gql } from "graphql-request";
export const ARTICLES_SITEMAP_QUERY = gql`
  query {
    articles(sort: "updatedAt:DESC") {
      id
      title
      slug
      updatedAt
    }
  }
`;
