import {USERS_URL} from '../server/allAPI';
import {apiSlice} from './apiSlice';


export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,  // your backend login endpoint
        method: 'POST',
        body: credentials,
         headers: {
      'Content-Type': 'application/json', // 👈 Required
    },
      }),
    }),
  }),

})

export const {useLoginUserMutation} = userSlice;