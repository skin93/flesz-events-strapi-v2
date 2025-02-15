import { GraphQLClient } from "graphql-request";

const API_STRAPI = process.env.API_STRAPI;

export const grafbase = new GraphQLClient(API_STRAPI);
