import { gql } from "graphql-request";
export const SINGLE_ARTICLE_QUERY = gql`
  query singleArticleQuery($slug: String!) {
    articles(publicationState: LIVE, where: { slug: $slug }) {
      id
      title
      excerpt
      content
      slug
      image_cover {
        url
        alternativeText
        caption
        width
        height
      }
      category {
        id
        name
        slug
      }
      tags {
        id
        name
        slug
      }
      published_at
      createdAt
      writers {
        name
        id
      }
      related_articles {
        articles(sort: "published_at:DESC") {
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
  }
`;
