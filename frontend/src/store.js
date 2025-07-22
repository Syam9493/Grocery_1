import {configureStore} from '@reduxjs/toolkit';
import cartReduer from './Slice/cartSlice';
import wishListReduer from './Slice/WhishListSlice';
import checkItemsReducer from './Slice/ProdutSlice';
import authReducer from './Slice/authSlice';
import {apiSlice} from './ApiSlice/apiSlice';


export const store = configureStore({
    reducer: {
        cart: cartReduer,
        whishList: wishListReduer,
        checkItems: checkItemsReducer,
        userInfo: authReducer,
        [apiSlice.reducerPath]:  apiSlice.reducer,
    },
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),

});