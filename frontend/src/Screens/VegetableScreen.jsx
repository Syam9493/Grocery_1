import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import Vegetables from "../Components/Vegetables";
import { useGetFilteredProductsQuery } from "../ApiSlice/ProductApiSlice";
///import {useGetProductsQuery} from '../ApiSlice/ProductApiSlice';
import { useGetUserWishListQuery } from "../ApiSlice/whishListSlice.js";
import useAuthUser from "../Hooks/useAuthUser.js";

const VegetableScreen = () => {
  const location = useLocation();
  const ProductData = location.pathname.substring(1);
  const { userID } = useAuthUser();

  const {
    data: response,
    isLoading,
    isError,
  } = useGetFilteredProductsQuery(ProductData);
  const { data: wishListItems } = useGetUserWishListQuery(userID);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (isLoading)
    return (
      <div className="flex justify-center m-20">
        <ClipLoader size={100} />
      </div>
    );
  if (isError) return <p>Error: {isError?.error || "Something went wrong"}</p>;

  // Get the actual products array
  const products = response?.data || [];

  return (
    <>
      <div className="grid grid-cols-1 place-items-center  md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 gap-4 p-6">
        {products.map((product) => (
          <Vegetables
            key={product._id}
            product={product}
            wishListItems={wishListItems}
          />
        ))}
      </div>
    </>
  );
};

export default VegetableScreen;
