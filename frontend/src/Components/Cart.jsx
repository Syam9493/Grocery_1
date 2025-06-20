import React, { useState } from "react";
//import { useDispatch } from "react-redux";
import { Link } from "react-router";
//import {useNavigate} from 'react-router-dom';
// import {toast} from 'react-toastify';
//import {deletefromCart, increaseQty, decreaseQty} from '../Slice/cartSlice';
//import { increaseQty, decreaseQty } from "../Slice/cartSlice";
// import {addToWishList} from '../Slice/WhishListSlice';
import CartAlert from "./CartAlert";
import Quantity from "./Quantity";

const Cart = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [id, setid] = useState("");
  //const [qty, setQty] = useState(1);

  //const dispatch = useDispatch();
  //const  navigate = useNavigate();

  //  const deleteItmehandler = async (id) => {
  //      dispatch(deletefromCart(id));
  //  }

  //  const addToCartHandler = (id) => {
  //        dispatch(addToWishList(id));
  //        toast.success("Product add to wishList", {
  //         autoClose: 1000
  //        })
  //        setTimeout(() => {
  //          navigate('/whishList');
  //        },2000)
  //      }

  // const increaseQtyHandler = (id) => {
  //   dispatch(increaseQty(id));
  // };

  // const decreaseQtyHandler = (id) => {
  //   dispatch(decreaseQty(id));
  // };

  return (
    <>
      {product.map((item) => (
        <tr key={item._id} className="bg-white rounded-lg shadow-sm mt-4">
          <td className="flex items-center gap-4 p-4">
            <button
              className="text-xl text-gray-500 hover:text-red-500"
              onClick={() => {
                setOpen(true);
                setid(item);
              }}
            >
              x
            </button>
            <img
              src={item.image}
              alt={item.name}
              className="size-14 object-contain rounded"
            />
            <div>
              <Link to={`/productDetailsPage/${item._id}`}>
                <p className="font-medium">{item.name}</p>
              </Link>
              <p className="text-sm text-gray-400">{item.weight}</p>
            </div>
          </td>
          <td className="p-4">₹{item.price}</td>
          <td className="p-4">
            <div className="flex items-center justify-center border rounded-3xl p-1">
              {/*  <button
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
                onClick={async () => {
                  await increaseQtyHandler(item._id);
                }}
              >
                +
              </button>
               */}
              <Quantity product={item._id} />
            </div>
          </td>
          <td className="p-4">₹{item.price * item.quantity}</td>
        </tr>
      ))}
      <tr>
        <td>
          <CartAlert open={open} setOpen={setOpen} id={id} />
        </td>
      </tr>
    </>
  );
};

export default Cart;
