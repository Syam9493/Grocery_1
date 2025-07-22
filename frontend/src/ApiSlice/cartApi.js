import {CART_URL} from '../server/allAPI';
import { apiSlice } from './apiSlice';


export const cartApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
    getUserCart: builder.query({
      query: (userID) => `${CART_URL}/${userID}`,
      method: 'GET',
       providesTags: (result, error, userID) => [
    { type: 'Cart', id: userID },
  ],
    }),
    updateUserCart: builder.mutation({
      query: ({userID, product}) => ({
        url: `${CART_URL}/${userID}`,
        method: 'POST',
        body:  product,
      }),
      invalidatesTags: ['Cart']
    }),
    updateQuantity: builder.mutation({
      query: ({userID, productID, quantity}) => ({
        url: `${CART_URL}/${userID}`,
        method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({productID,quantity})
      }),
      invalidatesTags: (result, error, { userID }) => [
        { type: 'Cart', id: userID },
      ],
    }),
    deleteFromCart: builder.mutation({
  query: ({ userID, itemID }) => ({
    url: `${CART_URL}/${userID}`,
    method: 'DELETE',
    body: { itemID }, 
  }),
  invalidatesTags: (result, error, { userID }) => [
    { type: 'Cart', id: userID },
  ],
}),
    deleteAllFromCart: builder.mutation({
        query: ({userID}) => ({
            url: `${CART_URL}/${userID}`,
            method: 'DELETE',
        })
    }),
     invalidatesTags: ['Cart']
  }),
})


export const {useGetUserCartQuery,useUpdateUserCartMutation, useUpdateQuantityMutation, useDeleteFromCartMutation} = cartApi;