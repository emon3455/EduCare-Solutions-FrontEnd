import { apiSlice } from "../api/api";

export const courseSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllCourse: builder.query({
            query: () => {
                return {
                    url: `/classes`,
                    method: 'GET',
                };
            },
        }),

        getCourseById: builder.query({
            query: (id) => {
                return {
                    url: `/classes/${id}`,
                    method: 'GET',
                };
            },
        }),

        addCourse: builder.mutation({
            query: (data) => {
                return {
                    url: '/classes',
                    method: 'POST',
                    body: data,
                };
            },
        }),

        deleteCourse: builder.mutation({
            query: (id) => {
                return {
                    url: `/classes/${id}`,
                    method: "DELETE",
                };
            },
        }),

        updateCourse: builder.mutation({
            query: (data) => {
                const { id, info } = data;
                return {
                    url: `/classes/${id}`,
                    method: "PATCH",
                    body: info,
                };
            },
        }),

    }),
});

export const {
    useGetAllCourseQuery,
    useGetCourseByIdQuery,
    useAddCourseMutation,
    useDeleteCourseMutation,
    useUpdateCourseMutation
} = courseSlice;
