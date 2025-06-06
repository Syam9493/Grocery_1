import {configureStore} from '@reduxjs/toolkit';
import cartReduer from './Slice/cartSlice';
import wishListReduer from './Slice/WhishListSlice'


export const store = configureStore({
    reducer: {
        cart: cartReduer,
        whishList: wishListReduer,
    }
});