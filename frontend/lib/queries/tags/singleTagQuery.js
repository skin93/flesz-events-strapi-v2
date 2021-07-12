import { gql } from 'graphql-request';
export const SINGLE_TAG_QUERY = gql`
  query singleTagQuery($slug: String!) {
    tags(where: { slug: $slug }) {
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
