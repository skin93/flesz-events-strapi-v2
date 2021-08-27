import { gql } from 'graphql-request';
export const SINGLE_TAG_QUERY = gql`
  query singleTagQuery($slug: String!, $start: Int!, $limit: Int!) {
    articlesConnection {
      aggregate {
        count
      }
    }
    tags(where: { slug: $slug }, publicationState: LIVE) {
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
