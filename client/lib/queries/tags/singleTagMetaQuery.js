import { gql } from "graphql-request";
export const SINGLE_TAG_META_QUERY = gql`
  query singleTagMetaQuery($slug: String!) {
    seo: tags(where: { slug: $slug }) {
      metadata {
        meta_title
        meta_description
        og_title
        og_description
        og_locale
        og_type
        follow
        index
      }
    }
  }
`;
