import {configureStore} from '@reduxjs/toolkit';
import cartReduer from './Slice/cartSlice';


export const store = configureStore({
    reducer: {
        cart: cartReduer,
    }
});