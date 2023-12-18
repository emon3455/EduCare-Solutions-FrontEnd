import { apiSlice } from "../api/api";

export const blogSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllBlog: builder.query({
            query: () => {
                return {
                    url: `/blogs`,
                    method: 'GET',
                };
            },
        }),

        getBlogById: builder.query({
            query: (id) => {
              return {
                url: `/blogs/${id}`,
                method: 'GET',
              };
            },
        }),

        likeBlog: builder.mutation({
            query: (data) => {
                return {
                    url: `/blogsLike/${data.id}?NoOfLike=${data.noOfLike}&email=${data.email}`,
                    method: "PATCH",
                    body: data,
                };
            },
        }),

    }),
});

export const {
    useGetAllBlogQuery,
    useGetBlogByIdQuery,
    useLikeBlogMutation
} = blogSlice;