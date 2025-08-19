import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import Beverages from "../Components/Beverages";
import { useGetFilteredProductsQuery } from "../ApiSlice/ProductApiSlice";
import { useGetUserWishListQuery } from "../ApiSlice/whishListSlice.js";
import useAuthUser from "../Hooks/useAuthUser.js";

const BeveragesScreen = () => {
  const location = useLocation();
  const { userID } = useAuthUser();
  const { data: wishListItems } = useGetUserWishListQuery(userID);

  const ProductData = location.pathname.substring(1);
  //console.log(ProductData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetFilteredProductsQuery(ProductData);

  if (isLoading)
    return (
      <div className="flex justify-center m-20">
        <ClipLoader size={100} />
      </div>
    );
  if (isError) return <p>Error: {error?.error || "Something went wrong"}</p>;

  const products = response?.data || [];
  return (
    <>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6">
        {products.map((product) => (
          <Beverages
            key={product._id}
            product={product}
            wishListItems={wishListItems}
          />
        ))}
      </div>
    </>
  );
};

export default BeveragesScreen;
