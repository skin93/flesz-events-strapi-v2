import { gql } from "graphql-request";
export const SINGLE_CATEGORY_META_QUERY = gql`
  query singleCategoryMetaQuery($slug: String!) {
    seo: categories(where: { slug: $slug }) {
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
