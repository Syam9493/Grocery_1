import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Cart from "../Components/Cart";
import { useGetUserCartQuery } from "../ApiSlice/cartApi.js";
import { addingToCart } from "../Slice/cartSlice.js";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userID = userInfo?._id;

  const { data, isSuccess, refetch } = useGetUserCartQuery(userID, {
    skip: !userID, // prevent query if no userID
  }); // Destructure properly

  useEffect(() => {
  if (isSuccess && data) {
    dispatch(addingToCart(data));
  }
}, [isSuccess, data, dispatch]);


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
        {Array.isArray(cartItems) && <Cart product={cartItems} refetch={refetch} />}
      </tbody>
    </table>
  </div>
     
  {/* Order Summary Section */}
  <div className="w-full lg:w-1/5">
    {data?.data && (
      <div className="w-full bg-white rounded-lg shadow-md p-5 space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Order Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Items</span>
            <span className="font-medium">{data?.data?.totalItems || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span className="font-medium">₹{data?.data?.subtotal?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-medium">₹{data?.data?.shippingcost?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span className="font-medium">₹{data?.data?.taxes?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between">
            <span>Coupon Discount</span>
            <span className="text-red-600 font-medium">
              - ₹{data?.data?.couponDiscount?.toFixed(2) || "0.00"}
            </span>
          </div>
        </div>

        <div className="border-t pt-2 flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>₹{data?.data?.total?.toFixed(2) || "0.00"}</span>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-full transition duration-200">
          Proceed to Checkout
        </button>
      </div>
    )}
  </div>

 
</div>
    </>
  );
};

export default CartScreen;
