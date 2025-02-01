import { request } from "graphql-request";

export const fetchWithArgs = (query, { ...args }) =>
  request(process.env.API_STRAPI, query, { ...args });

export const fetcher = (query) => request(process.env.API_STRAPI, query);
