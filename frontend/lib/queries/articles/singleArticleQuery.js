import { gql } from 'graphql-request';
export const SINGLE_ARTICLE_QUERY = gql`
  query singleArticleQuery($slug: String!) {
    articles(where: { slug: $slug }) {
      title
      excerpt
      content
      image_cover {
        url
        alternativeText
        caption
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
      writers {
        name
      }
      metadata {
        meta_title
        meta_description
        share_image {
          media {
            url
          }
          alt
        }
      }
    }
  }
`;
