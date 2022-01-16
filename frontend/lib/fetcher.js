import { request } from "graphql-request";

export const fetchWithArgs = (query, { ...args }) =>
  request(process.env.NEXT_PUBLIC_API_STRAPI, query, { ...args });

export const fetcher = (query) =>
  request(process.env.NEXT_PUBLIC_API_STRAPI, query);
