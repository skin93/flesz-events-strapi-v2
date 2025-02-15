import { gql } from "graphql-request";
export const SINGLE_ARTICLE_META_QUERY = gql`
  query singleArticleMetaQuery($slug: String!) {
    articles(publicationState: LIVE, where: { slug: $slug }) {
      metadata {
        meta_title
        meta_description
        og_title
        og_description
        og_locale
        og_type
        follow
        index
        share_image {
          media {
            url
            caption
            alternativeText
            width
            height
          }
        }
      }
    }
  }
`;
