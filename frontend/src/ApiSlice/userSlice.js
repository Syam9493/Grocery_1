import { USERS_URL } from "../server/allAPI";
import { apiSlice } from "./apiSlice";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
     getCurrentUser: builder.query({
      query: () => `${USERS_URL}/me`,
      providesTags: ['User'],
    }),
loginUser: builder.mutation({
  query: (credentials) => ({
    url: `${USERS_URL}/login`, // now root path
    method: "POST",
    body: credentials,
    headers: {
      "Content-Type": "application/json",
    },
  }),
}),


    registerUser: builder.mutation({
      query: ({
        FirstName,
        LastName,
        email,
        password,
        confPassword,
        cellNumber,
      }) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: {
          FirstName,
          LastName,
          email,
          password,
          confPassword,
          cellNumber,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {  useGetCurrentUserQuery ,useLoginUserMutation, useRegisterUserMutation } = userSlice;


// import { USERS_URL } from "../server/allAPI";
// import { apiSlice } from "./apiSlice";

// export const userSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getCurrentUser: builder.query({
//       query: () => `${USERS_URL}/me`,
//       providesTags: ['User'],
//     }),

//     loginUser: builder.mutation({
//       query: (credentials) => ({
//         url: `${USERS_URL}/login`,
//         method: "POST",
//         body: credentials,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//     }),

//     registerUser: builder.mutation({
//       query: ({
//         FirstName,
//         LastName,
//         email,
//         password,
//         confPassword,
//         cellNumber,
//       }) => ({
//         url: `${USERS_URL}`,
//         method: "POST",
//         body: {
//           FirstName,
//           LastName,
//           email,
//           password,
//           confPassword,
//           cellNumber,
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//     }),
//   }),
// });

// export const {  
//   useGetCurrentUserQuery,
//   useLoginUserMutation,
//   useRegisterUserMutation
// } = userSlice;
