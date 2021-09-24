import { gql } from 'graphql-request';
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
        og_title
        meta_description
        og_description
        og_locale
        og_type
        follow
        index
        keywords
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
