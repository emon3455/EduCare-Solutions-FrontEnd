import { apiSlice } from "../api/api";

export const statsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getStats: builder.query({
            query: () => {
              return {
                url: `/stats`,
                method: "GET",
              };
            },
          }),

    }),
});

export const {
    useGetStatsQuery,
} = statsSlice;