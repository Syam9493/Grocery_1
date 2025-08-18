import {PRODUCTS_URL, FILTERED_PRODUCT_URL} from '../server/allAPI'
import {apiSlice} from './apiSlice';

 export const ProductApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
getProducts: builder.query({
  query: ({ keyword = '', categories = [], page = 1, limit = 12 } = {}) => {
    const query = [
      keyword && `keyword=${encodeURIComponent(keyword)}`,
      categories.length > 0 && `categories=${encodeURIComponent(JSON.stringify(categories))}`,
      `page=${page}`,
      `limit=${limit}`
    ]
      .filter(Boolean)
      .join('&');

    return `${PRODUCTS_URL}?${query}`;
  },
  providesTags: ['Products'],
}),



      getFilteredProducts: builder.query({
  query: (ProductData) => {
    if (typeof ProductData === 'object') {
      const query = Object.entries(ProductData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
      return {
        url: `${FILTERED_PRODUCT_URL}?${query}`
      };
    }
    return {
      url: `${FILTERED_PRODUCT_URL}/${encodeURIComponent(ProductData)}`
    };
  }
}),
     getProductByID: builder.query({
        query: (id) => ({
            url: `${PRODUCTS_URL}/${id}`,
        })
     }),
      
    })
 })


 export const {useGetProductsQuery, useGetProductByIDQuery, useGetFilteredProductsQuery} = ProductApiSlice;