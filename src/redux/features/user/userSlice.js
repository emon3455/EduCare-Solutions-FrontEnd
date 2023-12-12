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

        addUser: builder.mutation({
            query: (data) => {
                return {
                    url: '/users',
                    method: 'POST',
                    body: data,
                };
            },
        }),

    }),
});

export const {
    useGetAllUserQuery,
    useGetUserByIdQuery,
    useAddUserMutation
} = userSlice;
