import { USERS_URL } from "../server/allAPI";
import { apiSlice } from "./apiSlice";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
     getCurrentUser: builder.query({
      query: () => `${USERS_URL}/user`,
      providesTags: ['User'],
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`, // your backend login endpoint
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json", // 👈 Required
        },
      }),
    }),

    regissterUser: builder.mutation({
      query: ({
        FirstName,
        LastName,
        email,
        password,
        confPassword,
        cellNumber,
      }) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: {
          FirstName,
          LastName,
          email,
          password,
          confPassword,
          cellNumber,
        },
      }),
    }),
  }),
});

export const {  useGetCurrentUserQuery ,useLoginUserMutation, useRegissterUserMutation } = userSlice;
