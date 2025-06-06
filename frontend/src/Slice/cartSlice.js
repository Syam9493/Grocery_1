import {createSlice} from '@reduxjs/toolkit';
//import { act } from 'react';

export const initialState = localStorage.getItem("carts") ?  JSON.parse(localStorage.getItem("carts")) : {cartItems: []};

const updateCart = async (state) => {
   localStorage.setItem('carts', JSON.stringify(state));
   return state;
}


export const cartSlice = createSlice({
   name: 'cart',
    initialState,
    reducers: {
         addingToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((p) => p._id === item._id);

            if(existItem){
                  state.cartItems = state.cartItems.map((items) => items._id === existItem._id ? item : items);
            } else {
                state.cartItems = [...state.cartItems, item]
            }
            return updateCart(state); 
         },

         deletefromCart : (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
                  return updateCart(state);
         },

         Increment: (state, action) => {
            const update = state.cartItems.findIndex((x) => x._id === action.payload);
            if(state.cartItems[update].quantity > 1){
               return updateCart(state.cartItems[update].quantity += 1);
            }
            
         },
    }
})

export const {addingToCart,deletefromCart, Increment} = cartSlice.actions;

export default cartSlice.reducer;
