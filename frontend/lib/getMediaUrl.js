export function getMediaUrl(media) {
  return `${process.env.NEXT_PUBLIC_STRAPI}${media.url}`;
}
