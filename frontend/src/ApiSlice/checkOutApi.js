import {apiSlice} from './apiSlice';
import {CHECKOUT_URL} from '../server/allAPI';

export const orderSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (payload) => ({
        url: `${CHECKOUT_URL}`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})


export const {useCreateOrderMutation} = orderSlice;