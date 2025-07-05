import { createSlice } from "@reduxjs/toolkit";
//import { act } from 'react';

export const initialState = localStorage.getItem("carts")
  ? JSON.parse(localStorage.getItem("carts"))
  : { cartItems: []};



const updateCart = (cartItems) => {
  localStorage.setItem("carts", JSON.stringify(cartItems));
  return cartItems;
};


// const updateQuantity = (qty) => {
//   localStorage.setItem("carts",JSON.stringify(qty));
//   return qty;
// }

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addingToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((p) => p._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((items) =>{
          items._id === existItem._id ? item : items
        } )
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },



    deletefromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    increaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item && item.quantity >= 1) {
        item.quantity += 1;
      }
      return updateCart(state);
    },

    decreaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      return updateCart(state);
    },
  },
});

export const { addingToCart, deletefromCart, increaseQty, decreaseQty } =
  cartSlice.actions;

export default cartSlice.reducer;

