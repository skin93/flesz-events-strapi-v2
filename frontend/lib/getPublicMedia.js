export function getPublicMedia(url) {
  return `${process.env.NEXT_PUBLIC_APP_DOMAIN}${url}`;
}
