import { apiSlice } from "../api/api";

export const blogSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlog: builder.query({
      query: () => {
        return {
          url: `/blogs`,
          method: "GET",
        };
      },
    }),

    getBlogById: builder.query({
      query: (id) => {
        return {
          url: `/blogs/${id}`,
          method: "GET",
        };
      },
    }),

    deleteBlog: builder.mutation({
      query: (id) => {
        return {
          url: `/blogs/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllBlogQuery,
  useGetBlogByIdQuery,
  useDeleteBlogMutation,
} = blogSlice;
