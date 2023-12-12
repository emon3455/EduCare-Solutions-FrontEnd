import { apiSlice } from "../api/api";


export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllUser: builder.query({
            query: () => {
                return {
                    url: `/users`,
                    method: 'GET',
                };
            },
        }),

        getUserById: builder.query({
            query: (id) => {
              return {
                url: `/users/${id}`,
                method: 'GET',
              };
            },
        }),

    }),
});

export const {
    useGetAllUserQuery,
    useGetUserByIdQuery,
} = userSlice;
