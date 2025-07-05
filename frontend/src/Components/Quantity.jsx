import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty } from "../Slice/cartSlice";

const Quantity = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const finalCount = cartItems.filter((p) => p._id === product);

  const increaseQtyHandler = (id) => {
    dispatch(increaseQty(id));
  };

  const decreaseQtyHandler = (id) => {
    dispatch(decreaseQty(id));
  };
  return (
    <>
      {finalCount.map((item) => (
        <div key={item}>
          <button
            className="px-2 border-r-2 border-gray-400 h-10"
            onClick={() => decreaseQtyHandler(item._id)}
          >
            -
          </button>

          <span className="px-3 divider lg:divider-horizontal">
            {item.quantity}
          </span>

          <button
            className="px-2 border-l-2 border-gray-400 h-10"
            // onClick={() => increaseQtyHandler(product._id)}
            onClick={() => {
              increaseQtyHandler(item._id);
            }}
          >
            +
          </button>
        </div>
      ))}
    </>
  );
};

export default Quantity;
