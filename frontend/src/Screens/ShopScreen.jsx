
// //96183541



import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import Shop from "../Components/Shop";
import ProductFilter from "../Components/ProductFilter";
//import API from "../server/api";
import { removeCheckItem, clearCheckItems } from "../Slice/ProdutSlice";
import {useGetProductsQuery} from '../ApiSlice/ProductApiSlice';

//import axios from 'axios';

 const useQuery = () => new URLSearchParams(useLocation().search);

const ShopScreen = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const location = useLocation();
  const dispatch = useDispatch();
  const checkItems = useSelector((state) => state.checkItems);
     const categories  =  checkItems.checkItems;
     console.log(categories);

     const clearFilteredItmeHandler = (value) => {
    dispatch(removeCheckItem(value));
  };
  const clearAllFilteredItmesHandler = () => {
    dispatch(clearCheckItems([]));
  };
 

   useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    const query = useQuery();
    const navigate = useNavigate();
  const page = Number(query.get('page')) || 1;

   const keyWord = useParams();
   console.log(keyWord);
   const {data, isLoading} = useGetProductsQuery({ keyword, categories, page});
   const res = data;
   const products = data?.data || [];
   console.log(res);



  const handlePageChange = (newPage) => {
  const newQuery = new URLSearchParams();

  if (keyword) newQuery.set('keyword', keyword);
  if (categories.length > 0) {
    categories.forEach((cat) => newQuery.append('categories', cat));
  }
  newQuery.set('page', newPage);
  navigate(`/shop?${newQuery.toString()}`);
};

  return(
      <>
      {
      (isLoading) ? <div className="flex justify-center m-20">
        <ClipLoader size={100} />
      </div> :
      <div className="overflow-x-auto m-6">
      <div className="min-w-full grid grid-flow-col bg-white mt-1 mb-4 p-6">
        <div className="hidden md:grid md:grid-cols-1 md:p-7">
          <div className="max-w-full flex flex-col">
            <ProductFilter />
          </div>
        </div>
        <div className="m-7 flex flex-col justify-center">
            <div className="m-10">
          <div className="hidden md:grid md:grid-cols-5 md:items-center md:justify-center md:gap-3">
            <p className="font-sans font-bold text-xl">Active Filteres:</p>
            {checkItems.checkItems &&
              checkItems.checkItems.map((items, i) => (
                <button
                  key={i}
                  className="sm:w-full flex items-center justify-center gap-3 bg-yellow-300 text-black font-bold font-stretch-100% border-gray-50 rounded-4xl py-2"
                  onClick={() => clearFilteredItmeHandler(items)}
                >
                  {items}
                  <span>x</span>
                </button>
              ))}
            <button
              className="ml-7 font-sans font-semibold text-[1.1em] text-green-700 border-b-2 w-20"
              onClick={clearAllFilteredItmesHandler}
            >
              Clear All
            </button>
             </div>
          </div>
          <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {/* {products &&
              products.map((product) => (
                <Shop key={product._id} product={product} />
              ))} */}

            {products.map((product) => (
              <Shop key={product._id} product={product} />
            ))}
            {/* {res.data.map((product) => (
              <Shop key={product._id} product={product} />
            ))} */}

            {/* <button
              className="h-md/1 w-md/4 bg-green-700 rounded-2xl font-sans font-semibold text-[1rem] text-white px-4 py-3"
              onClick={loadMoreProductshandler}
            > */}
          </div>
         <div className="flex items-center justify-center gap-3 mt-20">
  {[...Array(data?.pages).keys()].map((x) => (
    <button
      key={x + 1}
      onClick={() => handlePageChange(x + 1)}
      className={`px-4 py-2 rounded-md border text-sm font-medium transition 
        ${
          x + 1 === data.page
            ? 'bg-green-700 text-white border-green-700'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        }`}
    >
      {x + 1}
    </button>
  ))}
</div>

        </div>
      </div>
      </div>
      }
    </>
  )
}


export default ShopScreen;
