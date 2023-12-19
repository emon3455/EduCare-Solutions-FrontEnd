import { apiSlice } from "../api/api";

export const sessionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSession: builder.query({
      query: () => {
        return {
          url: `/sessions`,
          method: "GET",
        };
      },
    }),

    getSessionById: builder.query({
      query: (id) => {
        return {
          url: `/sessions/${id}`,
          method: "GET",
        };
      },
    }),

    addSession: builder.mutation({
      query: (data) => {
        return {
          url: "/sessions",
          method: "POST",
          body: data,
        };
      },
    }),

    deleteSession: builder.mutation({
      query: (id) => {
        return {
          url: `/sessions/${id}`,
          method: "DELETE",
        };
      },
    }),

    getAllMySession: builder.query({
      query: (data) => {
        const { email } = data;
        return {
          url: `/sessions/mySessions?teacherEmail=${email}`,
          method: "GET",
        };
      },
    }),

    updateSession: builder.mutation({
      query: (data) => {
        return {
          url: `/sessions/${data?.id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllSessionQuery,
  useGetSessionByIdQuery,
  useAddSessionMutation,
  useDeleteSessionMutation,
  useUpdateSessionMutation,
  useGetAllMySessionQuery,
} = sessionSlice;
