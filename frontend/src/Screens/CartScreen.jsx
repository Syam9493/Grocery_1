import React from "react";
import { useSelector } from "react-redux";
import Cart from "../Components/Cart";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  

  return (
    <>
      <table className="table-auto text-left mt-5 mb-5 mx-auto">
        <thead>
          <tr className="border-2 rounded-2xl bg-yellow-500 text-white">
            <th className="p-4">Product</th>
            <th className="p-4">Price</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Subtotal</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <Cart product={cartItems} />
        </tbody>
      </table>
    </>
  );
};

export default CartScreen;
