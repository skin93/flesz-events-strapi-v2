import { gql } from 'graphql-request';
export const SINGLE_TAG_QUERY = gql`
  query singleTagQuery($slug: String!) {
    tags(where: { slug: $slug }, publicationState: LIVE) {
      name
      description
      slug
      articles(sort: "published_at:DESC", publicationState: LIVE) {
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
