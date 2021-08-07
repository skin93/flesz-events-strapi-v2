import { gql } from 'graphql-request';
export const ALL_FESTIVALS_QUERY = gql`
  query {
  festivals{
    id
    name
    description
    slug
    image {
      url
    }
  }
}
`;
