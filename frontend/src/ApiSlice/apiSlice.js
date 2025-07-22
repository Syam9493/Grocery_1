import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../server/allAPI'


const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});
 
export const apiSlice = createApi({
     reducerPath: 'api',
    baseQuery,
    tagTypes: ['Products','Orders', 'Users', 'Cart'],
    endpoints: ()=> ({}),
})