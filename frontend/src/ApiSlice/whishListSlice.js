import { WISHLIST_URL } from "../server/allAPI.js";
import { apiSlice } from "./apiSlice.js";

export const wishListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserWishList: builder.query({
      query: (userID) => `${WISHLIST_URL}/${userID}`,
      method: "GET",
      providesTags: (result, error, userID) => [
        { type: "WishList", id: `LIST-${userID}` },
      ],
    }),
    addToWishList: builder.mutation({
      query: ({ userID, product }) => ({
        url: `${WISHLIST_URL}/${userID}`,
        method: "POST",
        body: product,
        headers: {
          "Content-Type": "application/json", // Explicitly set JSON
        },
      }),
      invalidatesTags: (result, error, { userID }) => [
        { type: "WishList", id: `LIST-${userID}` },
      ],
    }),
    deleteFromWishList: builder.mutation({
      query: ({ userID, productID }) => ({
        url: `${WISHLIST_URL}/${userID}`,
        method: "DELETE",
        body: { productID },
        headers: {
          "Content-Type": "application/json", // Explicitly set JSON
        },
      }),
      invalidatesTags: (result, error, { userID }) => [
        { type: "WishList", id: `LIST-${userID}` },
      ],
    }),
  }),
});

export const {
  useGetUserWishListQuery,
  useAddToWishListMutation,
  useDeleteFromWishListMutation,
} = wishListSlice;
