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

        getAllMyCourse: builder.query({
            query: (data) => {
                const {email} = data;
                return {
                    url: `/classes/myClass?teacherEmail=${email}`,
                    method: 'GET',
                };
            },
        }),

        getAllSuggestedCourse: builder.query({
            query: (email) => {
                return {
                    url: `/getSuggestedCourses/${email}`,
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
                return {
                    url: `/classes/${data?.id}`,
                    method: "PATCH",
                    body: data,
                };
            },
        }),

        

    }),
});

export const {
    useGetAllCourseQuery,
    useGetAllMyCourseQuery,
    useGetCourseByIdQuery,
    useAddCourseMutation,
    useDeleteCourseMutation,
    useUpdateCourseMutation,
    useGetAllSuggestedCourseQuery
} = courseSlice;
