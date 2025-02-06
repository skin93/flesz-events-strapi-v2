import { gql } from "graphql-request";
export const LATEST_ARTICLES_QUERY = gql`
  query latestArticlesQuery($start: Int!, $limit: Int!) {
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
    concerts: articles(
      publicationState: LIVE
      start: $start
      limit: $limit
      sort: "published_at:DESC"
      where: { category: { slug: "koncerty" } }
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
    news: articles(
      publicationState: LIVE
      start: $start
      limit: $limit
      sort: "published_at:DESC"
      where: { category: { slug: "newsy" } }
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
    festivals: articles(
      publicationState: LIVE
      start: $start
      limit: $limit
      sort: "published_at:DESC"
      where: { category: { slug: "festiwale" } }
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
    singles: articles(
      publicationState: LIVE
      start: $start
      limit: $limit
      sort: "published_at:DESC"
      where: { category: { slug: "single" } }
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
