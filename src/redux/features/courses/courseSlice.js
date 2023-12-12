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

    }),
});

export const {
    useGetAllCourseQuery,
    useGetCourseByIdQuery,
} = courseSlice;
