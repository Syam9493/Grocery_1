import {configureStore} from '@reduxjs/toolkit';
import cartReduer from './Slice/cartSlice';
import wishListReduer from './Slice/WhishListSlice';
import checkItemsReducer from './Slice/ProdutApi';
import {apiSlice} from './Slice/apiSlice';


export const store = configureStore({
    reducer: {
        cart: cartReduer,
        whishList: wishListReduer,
        checkItems: checkItemsReducer,
        [apiSlice.reducerPath]:  apiSlice.reducer,
    },
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),

});