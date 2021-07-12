import { gql } from 'graphql-request';
export const SINGLE_CATEGORY_QUERY = gql`
  query singleCategoryQuery($slug: String!) {
    categories(where: { slug: $slug }) {
      name
      description
      slug
      articles {
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
        meta_description
        follow
        keywords
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
