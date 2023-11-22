import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { ApiData, IApi } from '../utils/types/types';

export const fetchData = createApi({
  reducerPath: 'apiData',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://belka.romakhin.ru/api/v1/rimorti',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getAllCharacter: builder.query<ApiData, { page: string; pageSize: string }>(
      {
        query: ({ page, pageSize }) =>
          `?page=${Number(page) - 1}&page_size=${pageSize}`,
      }
    ),
    searchCharacterByName: builder.query<
      ApiData,
      { queryParam: string; page: string; pageSize: string }
    >({
      query: ({ queryParam, page, pageSize }) =>
        `?page=${
          Number(page) - 1
        }&page_size=${pageSize}&search.name=${queryParam.trim()}`,
    }),
    getCharacter: builder.query<IApi, string>({
      query: (id) => `/${id}`,
    }),
  }),
});
