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

        getUserRoleByEmail: builder.query({
            query: (email) => {
                return {
                    url: `/users/role/${email}`,
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

        deleteUser: builder.mutation({
            query: (id) => {
                return {
                    url: `/users/${id}`,
                    method: 'DELETE',
                };
            },
        }),

        updateRole: builder.mutation({
            query: (data) => {
                return {
                    url: `/usersRole/${data.id}`,
                    method: "PATCH",
                    body: data,
                };
            },
        }),

    }),
});

export const {
    useGetAllUserQuery,
    useGetUserByIdQuery,
    useAddUserMutation,
    useGetUserRoleByEmailQuery,
    useDeleteUserMutation,
    useUpdateRoleMutation,
} = userSlice;
