import { apiSlice } from "../api/api";

export const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        addJWT: builder.mutation({
            query: () => {
                return {
                    url: `/jwt`,
                    method: 'POST',
                };
            },
        }),

    }),
});

export const {
    useAddJWTMutation
} = authSlice;