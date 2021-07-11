import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_API_STRAPI;

export const client = new GraphQLClient(endpoint);
