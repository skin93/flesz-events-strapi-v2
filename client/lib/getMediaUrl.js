const STRAPI = process.env.NEXT_PUBLIC_STRAPI;

export function getMediaUrl(media) {
  return `${STRAPI}${media.url}`;
}
