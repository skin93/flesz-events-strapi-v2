import { gql } from 'graphql-request';
export const ALL_FESTIVALS_QUERY = gql`
  query {
    festivals {
      id
      name
      description
      slug
      location {
        city
        place
        latitude
        longitude
      }
      next_event {
        name
        date
        from_date
        to_date
      }
      image {
        url
      }
    }
  }
`;
