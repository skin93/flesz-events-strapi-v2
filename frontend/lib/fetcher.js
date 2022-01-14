import { request } from "graphql-request";

export const fetcher = (query, { ...args }) =>
  request(process.env.NEXT_PUBLIC_API_STRAPI, query, { ...args });

export const tagsFetcher = (query) =>
  request(process.env.NEXT_PUBLIC_API_STRAPI, query);

export const articlesFetcher = (query) =>
  request(process.env.NEXT_PUBLIC_API_STRAPI, query);

export const categoriesFetcher = (query) =>
  request(process.env.NEXT_PUBLIC_API_STRAPI, query);
