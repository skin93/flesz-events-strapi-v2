import { gql } from "graphql-request";

export const ALL_EVENTS_BY_DATE_QUERY = gql`
  query allEventsByYearQuery($date: String!) {
    events(where: { date_gte: $date }, sort: "date") {
      id
      name
      date
      end_date
      city
      place
      article {
        slug
      }
    }
    eventsConnection {
      aggregate {
        count
      }
    }
  }
`;
