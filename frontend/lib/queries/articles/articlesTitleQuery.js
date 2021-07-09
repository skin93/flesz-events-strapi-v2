import { gql } from 'graphql-request';
export const ARTICLES_TITLE_QUERY = gql`
  query {
    articles(publicationState: LIVE) {
      id
      title
      slug
    }
  }
`;
