import { apiSlice } from "../api/api";

export const paymentSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        addPaymentIntent: builder.mutation({
            query: (data) => {
                const storedToken = localStorage.getItem('edu-care-access-token');
                return {
                    url: '/create-payment-intent',
                    method: 'POST',
                    body: data,
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                };
            },
        }),

        addPayments: builder.mutation({
            query: (data) => {
                const storedToken = localStorage.getItem('edu-care-access-token');
                return {
                    url: '/payments',
                    method: 'POST',
                    body: data,
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                };
            },
        }),

        getEnrolledCourse: builder.query({
            query: (email) => {
                const storedToken = localStorage.getItem('edu-care-access-token');
                return {
                    url: `/enrolledClasses?email=${email}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                };
            },
        }),

        getEnrolledCourseById: builder.query({
            query: (id) => {
                const storedToken = localStorage.getItem('edu-care-access-token');
                return {
                    url: `/enrolledClasses/${id}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                };
            },
        }),

    }),
});

export const {
    useAddPaymentIntentMutation,
    useAddPaymentsMutation,
    useGetEnrolledCourseQuery,
    useGetEnrolledCourseByIdQuery,
} = paymentSlice;