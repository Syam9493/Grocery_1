import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Cart from "../Components/Cart";
import { useGetUserCartQuery } from "../ApiSlice/cartApi.js";
import { addingToCart } from "../Slice/cartSlice.js";
import OrderSummary from "../Components/OrderSummary.jsx";
import useAuthUser from "../Hooks/useAuthUser.js";

const CartScreen = () => {
  const dispatch = useDispatch();
  const { userID } = useAuthUser();
  const location = useLocation();

  const { data, isSuccess, refetch } = useGetUserCartQuery(userID, {
    skip: !userID, // prevent query if no userID
  }); // Destructure properly

  const cartItems = data?.data?.cartItems;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => { 
    if(!userID) return;
    if (userID & isSuccess && data) {
      dispatch(addingToCart(data));
    }
  }, [userID,isSuccess, data, dispatch]);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 p-4 sm:p-6 md:p-10 md:gap-3 lg:px-14 lg:gap-5">
        {/* Cart Table Section */}
        <div className="w-full lg:w-2/4 overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="bg-yellow-500 text-white">
                <th className="p-4 text-sm sm:text-base">Product</th>
                <th className="p-4 text-sm sm:text-base">Price</th>
                <th className="p-4 text-sm sm:text-base">Quantity</th>
                <th className="p-4 text-sm sm:text-base">Subtotal</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(cartItems) && (
                <Cart product={cartItems} refetch={refetch} />
              )}
            </tbody>
          </table>
        </div>

        <OrderSummary />
      </div>
    </>
  );
};

export default CartScreen;
