import React, { useState, useEffect } from "react";
import Cart from "../Components/Cart";

const CartScreen = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      for (let i = 0; i < localStorage.length; i++) {
        const response = localStorage.getItem(localStorage.key(i));
        const cart = JSON.parse(response);
        setProduct(cart.cartItems);
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      <table className="m-14 w-2xl table-auto text-left">
        <thead>
          <tr className="border-2 rounded-2xl bg-yellow-500 text-white">
            <th className="p-4">Product</th>
            <th className="p-4">Price</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Subtotal</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <Cart product={product} />
        </tbody>
      </table>
    </>
  );
};

export default CartScreen;
