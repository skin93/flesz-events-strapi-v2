const STRAPI = process.env.STRAPI;

export function getMediaUrl(media) {
  return `${STRAPI}${media.url}`;
}
