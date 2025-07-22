import {PRODUCTS_URL, FILTERED_PRODUCT_URL} from '../server/allAPI'
import {apiSlice} from './apiSlice';

 export const ProductApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      // getProducts:  builder.query({
      //   query: ( ProductData ) => {
      //     console.log(ProductData);
      //     //const queryString = ProductData.map((category) => `category=${encodeURIComponent(category)}`).join('&');
      //    return  `${PRODUCTS_URL}?${ProductData}`;
      //   },
      //   providesTags: ['Products'],
      // }),

//       getProducts: builder.query({
//   query: ({ keyword = '', ProductData = [] }) => {
//     const categoryParam = ProductData.length > 0 ? `&categories=${ProductData.join(',')}` : '';
//     const keywordParam = keyword ? `keyword=${encodeURIComponent(keyword)}` : '';
//     const queryString = [keywordParam, categoryParam].filter(Boolean).join('&');
    
//     return `${PRODUCTS_URL}?${queryString}`;
//   },
//   providesTags: ['Products'],
// }),

getProducts: builder.query({
  query: ({ keyword = '', categories = [], page = 1 }) => {
    const query = [
      keyword && `keyword=${encodeURIComponent(keyword)}`,
      categories.length && `categories=${categories.join(',')}`,
      `page=${page}`,
      `limit=12` // Set your default limit here
    ]
      .filter(Boolean)
      .join('&');

    return `${PRODUCTS_URL}?${query}`;
  },
  providesTags: ['Products'],
}),

//       getProducts: builder.query({
//   query: ({ ProductData = [], keyword = '' } = {}) => {
//     const params = new URLSearchParams();

//     // Add category filters
//     ProductData.forEach((category) => {
//       if (category) {
//         params.append('category', category);
//       }
//     });

//     // Add keyword filter
//     if (keyword) {
//       params.append('keyword', keyword);
//     }

//     return `${PRODUCTS_URL}?${params.toString()}`;
//   },
//   providesTags: ['Products'],
// }),
      getFilteredProducts: builder.query({
        query: (ProductData) => ({
          url: `${FILTERED_PRODUCT_URL}/${ProductData}`
        })
      }),
     getProductByID: builder.query({
        query: (id) => ({
            url: `${PRODUCTS_URL}/${id}`,
        })
     }),
      
    })
 })


 export const {useGetProductsQuery, useGetProductByIDQuery, useGetFilteredProductsQuery} = ProductApiSlice;