import {PRODUCTS_URL, FILTERED_PRODUCT_URL} from '../server/allAPI'
import {apiSlice} from './apiSlice';

 export const ProductApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getProducts:  builder.query({
        query: ( ProductData = [] ) => {
          const queryString = ProductData.map((category) => `category=${encodeURIComponent(category)}`).join('&');
         return  `${PRODUCTS_URL}?${queryString}`;
        },
        providesTags: ['Products'],
      }),
      getFilteredProducts: builder.query({
        query: (ProductData) => ({
          url: `${FILTERED_PRODUCT_URL}/${ProductData}`
        })
      }),
     getProductByID: builder.query({
        query: ({_id, name}) => ({
            url: `${PRODUCTS_URL}/?id=${_id}/?name=${name}`,
        })
     }),
      
    })
 })


 export const {useGetProductsQuery, useGetProductByIDQuery, useGetFilteredProductsQuery} = ProductApiSlice;