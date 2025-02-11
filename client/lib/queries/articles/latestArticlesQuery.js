import { gql } from "graphql-request";
export const LATEST_ARTICLES_QUERY = gql`
  query latestArticlesQuery($start: Int!, $limit: Int!) {
    news: categories(where: { slug: "newsy" }, publicationState: LIVE) {
      slug
      articles(sort: "createdAt:DESC", start: $start, limit: $limit) {
        id
        title
        slug
        image_cover {
          alternativeText
          url
          width
          height
        }
      }
    }
    concerts: categories(where: { slug: "koncerty" }, publicationState: LIVE) {
      slug
      articles(sort: "createdAt:DESC", start: $start, limit: $limit) {
        id
        title
        slug
        image_cover {
          alternativeText
          url
          width
          height
        }
      }
    }
    festivals: categories(
      where: { slug: "festiwale" }
      publicationState: LIVE
    ) {
      slug
      articles(sort: "createdAt:DESC", start: $start, limit: $limit) {
        id
        title
        slug
        image_cover {
          alternativeText
          url
          width
          height
        }
      }
    }
    singles: categories(where: { slug: "single" }, publicationState: LIVE) {
      slug
      articles(sort: "createdAt:DESC", start: $start, limit: $limit) {
        id
        title
        slug
        image_cover {
          alternativeText
          url
          width
          height
        }
      }
    }
    promo: categories(where: { slug: "polecamy" }, publicationState: LIVE) {
      slug
      articles(sort: "createdAt:DESC") {
        id
        title
        slug
        image_cover {
          alternativeText
          url
          width
          height
        }
      }
    }
  }
`;
