import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



//import { deletefromWhishList } from "../Slice/WhishListSlice";
import {addingToCart} from "../Slice/cartSlice.js";
import AlertNotification from "../Components/AlertNotification";
import {useDeleteFromWishListMutation} from "../ApiSlice/whishListSlice.js";
import {useUpdateUserCartMutation} from "../ApiSlice/cartApi.js"
import useAuthUser from "../Hooks/useAuthUser.js";

const WhishList = ({ wishListItems, isLoading, isError }) => {
  const [open, setOpen] = useState(false);
  const [id, setid] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUserCart] = useUpdateUserCartMutation();
  const [deleteFromWishList] = useDeleteFromWishListMutation();
  const {userID} = useAuthUser();

  const items = wishListItems?.wishList?.products || [];
  console.log("Wish List Items:", items);
 

  const addToCartHandler = async (item) => {
      if (!item) {
    console.error("No item provided");
    return;
  }

  const productID = item.productID || item._id; // Try both possible ID fields
  if (!productID) {
    console.error("Item has no ID", item);
    return;
  }

     const productData = {
    _id: productID,  // fallback to _id
    name: item.name,
    image: item.image,
    price: item.price,
    quantity: item.quantity || 1, // set default 1 if wishlist doesn't store quantity
    weight: item.weight,
    subtotal: item.price * (item.quantity || 1)
    };
    console.log("Adding to cart:", productData);

    if (!userID) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      const result = await updateUserCart({ userID, product: productData }).unwrap();
      await deleteFromWishList({ userID, productID }).unwrap();
      console.log("Cart Update Result:", result);
      dispatch(addingToCart(result));
      toast.success(result.message, {
        autoClose: 500,
        position: "top-right",
        theme: "colored",
      });
    } catch (err) {
      console.error("Cart Update Failed:", err);
      toast.error(err.data?.message || "Failed to add product to cart.");
    }
  };

  const deleteItemHandler = async (productID) => {
    const res = await deleteFromWishList({ userID, productID });
    console.log(res);
    toast.info(res.data?.message, {
      autoClose: 500,
    });
  };

  //  console.log(deleteItmehandler);
  return (
    <>
      { isLoading ? (<div>Loading...</div>) : isError ? (
          <tr>
            <td>{isError.message}</td>
          </tr>
      ) : Array.isArray(items) ? items.map((item) => (
          <tr key={item._id} className="bg-white rounded-lg shadow-sm mt-4">
            <td className="flex items-center gap-4 p-4">
              <button
                className="text-xl text-gray-500 hover:text-red-500"
                onClick={() => {
                  setOpen(true);
                  setid(item.productID);
                  deleteItemHandler(item.productID);
                }}
              >
                x
              </button>
              <img
                src={item.image[0]}
                alt={item.name}
                className="size-14 object-contain rounded"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-400">{item.weight}</p>
              </div>
            </td>
            <td className="p-4">₹{item.price}</td>
            <td className="p-4">{new Date(item.updatedAt).toISOString().split('T')[0]}</td>
            <td> <button
                className="flex items-center justify-center bg-green-700 text-white border-gray-50 rounded-4xl px-4 py-2"
                onClick={() => addToCartHandler(item, item.productID)}
              >
                Move To Cart
              </button>
            </td>
          </tr>
              )) : (
      <tr>
        <td>
          <AlertNotification open={open} setOpen={setOpen} id={id} />
        </td>
      </tr>
         )
      }
  </>
  )
};

export default WhishList;
