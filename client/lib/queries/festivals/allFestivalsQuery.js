import { gql } from "graphql-request";
export const ALL_FESTIVALS_QUERY = gql`
  query {
    festivals(publicationState: LIVE) {
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
      music_types {
        name
      }
      next_event {
        name
        date
        from_date
        to_date
      }
      image {
        url
        width
        height
        alternativeText
      }
    }
  }
`;
