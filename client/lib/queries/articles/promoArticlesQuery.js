import { gql } from "graphql-request";
export const PROMO_ARTICLES_QUERY = gql`
  query promoArticlesQuery($start: Int!, $limit: Int!) {
    promo: articles(
      publicationState: LIVE
      start: $start
      limit: $limit
      sort: "published_at:DESC"
      where: { category: { slug: "polecamy" } }
    ) {
      id
      title
      slug
      createdAt
      image_cover {
        alternativeText
        url
        width
        height
      }
      category {
        name
        slug
      }
    }
  }
`;
