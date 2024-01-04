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
            query: () => {
                const storedToken = localStorage.getItem('edu-care-access-token');
                return {
                    url: `/enrolledClasses`,
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
} = paymentSlice;