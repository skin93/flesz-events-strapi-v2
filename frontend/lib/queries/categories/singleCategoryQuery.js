import { gql } from "graphql-request";
export const SINGLE_CATEGORY_QUERY = gql`
  query singleCategoryQuery($slug: String!, $start: Int!, $limit: Int!) {
    articlesCountBasedOnTagOrCategory(
      where: { category: { slug: $slug }, published_at_null: false }
    )
    categories(where: { slug: $slug }, publicationState: LIVE) {
      name
      description
      slug
      articles(sort: "published_at:DESC", start: $start, limit: $limit) {
        id
        title
        slug
        image_cover {
          alternativeText
          url
        }
        category {
          name
          slug
        }
        published_at
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
        share_image {
          media {
            url
            caption
            alternativeText
          }
        }
      }
    }
  }
`;
