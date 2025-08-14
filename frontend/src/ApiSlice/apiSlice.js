import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../server/allAPI'


 
export const apiSlice = createApi({
     reducerPath: 'api',
   baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, // This will prefix /api to every request
    credentials: 'include', // If you use cookies for auth
  }),
     prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    tagTypes: ['Products','Orders', 'Users', 'Cart'],
    endpoints: ()=> ({}),
})