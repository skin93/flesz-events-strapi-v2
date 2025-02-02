import { gql } from "graphql-request";
export const SINGLE_ARTICLE_QUERY = gql`
  query singleArticleQuery($slug: String!) {
    articles(publicationState: LIVE, where: { slug: $slug }) {
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
        name
        slug
      }
      tags {
        name
        slug
      }
      published_at
      createdAt
      writers {
        name
      }
      related_articles {
        articles(sort: "published_at:DESC") {
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
