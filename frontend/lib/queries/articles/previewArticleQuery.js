import { gql } from 'graphql-request';
export const PREVIEW_ARTICLE_QUERY = gql`
  query previewArticleQuery($id: ID!) {
    article(id: $id, publicationState: PREVIEW) {
      title
      excerpt
      content
      slug
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
      updatedAt
      writers {
        name
      }
      metadata {
        meta_title
        meta_description
        follow
        keywords
        index
        share_image {
          media {
            url
            caption
            alternativeText
          }
        }
      }
      related_articles {
        articles(sort: "published_at:DESC") {
          title
          slug
          image_cover {
            alternativeText
            url
          }
        }
      }
    }
  }
`;
