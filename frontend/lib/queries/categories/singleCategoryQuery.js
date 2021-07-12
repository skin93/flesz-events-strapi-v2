import { gql } from 'graphql-request';
export const SINGLE_CATEGORY_QUERY = gql`
  query singleCategoryQuery($slug: String!) {
    categories(where: { slug: $slug }, publicationState: LIVE) {
      name
      description
      slug
      articles(sort: "published_at:DESC") {
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
        index
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
