import { client } from './requestClient';

export const fetcher = async (query, { ...args }) =>
  await client.request(query, { ...args });
