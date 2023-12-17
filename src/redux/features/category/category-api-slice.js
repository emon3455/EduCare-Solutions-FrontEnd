import { apiSlice } from "../api/api";

export const categorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllCategory: builder.query({
            query: () => {
                return {
                    url: `/categorys`,
                    method: 'GET',
                };
            },
        }),

        getCategoryById: builder.query({
            query: (id) => {
                return {
                    url: `/categorys/${id}`,
                    method: 'GET',
                };
            },
        }),

        addCategory: builder.mutation({
            query: (data) => {
                return {
                    url: '/categorys',
                    method: 'POST',
                    body: data,
                };
            },
        }),

        deleteCategory: builder.mutation({
            query: (id) => {
                return {
                    url: `/categorys/${id}`,
                    method: "DELETE",
                };
            },
        }),

        updateCategory: builder.mutation({
            query: (data) => {
                const { id, info } = data;
                return {
                    url: `/categorys/${id}`,
                    method: "PATCH",
                    body: info,
                };
            },
        }),

    }),
});

export const {
    useGetAllCategoryQuery,
    useGetCategoryByIdQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation
} = categorySlice;