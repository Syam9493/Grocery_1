import {configureStore} from '@reduxjs/toolkit';
import cartReduer from './Slice/cartSlice';
import wishListReduer from './Slice/WhishListSlice';
import checkItemsReducer from './Slice/ProdutApi'


export const store = configureStore({
    reducer: {
        cart: cartReduer,
        whishList: wishListReduer,
        checkItems: checkItemsReducer 
    }
});