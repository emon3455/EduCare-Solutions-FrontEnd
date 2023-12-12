import { apiSlice } from "../api/api";

export const sessionSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllSession: builder.query({
            query: () => {
                return {
                    url: `/sessions`,
                    method: 'GET',
                };
            },
        }),

        getSessionById: builder.query({
            query: (id) => {
              return {
                url: `/sessions/${id}`,
                method: 'GET',
              };
            },
        }),

    }),
});

export const {
    useGetAllSessionQuery,
    useGetSessionByIdQuery,
} = sessionSlice;