import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addingToCart } from "../Slice/cartSlice";
import { deletefromWhishList } from "../Slice/WhishListSlice";
import AlertNotification from "../Components/AlertNotification";

const WhishList = ({ wishListItems }) => {
  const [open, setOpen] = useState(false);
  const [id, setid] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const date = new Date();
  const getFullYear = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const fullday = day + "-" + month + "-" + getFullYear;

  const addToCartHandler = (id, Product_id) => {
    dispatch(addingToCart(id));
    dispatch(deletefromWhishList(Product_id));
    toast.success("Product add to Cart!", {
      position: "top-right",
      autoClose: 1000,
    });
    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  };

  const deleteItmehandler = async (id) => {
    dispatch(deletefromWhishList(id));
    toast.info("Product delete from wishList!", {
      autoClose: 500,
    });
  };

  //  console.log(deleteItmehandler);
  return (
    <>
      {Array.isArray(wishListItems) ? (
        wishListItems.map((item) => (
          <tr key={item._id} className="bg-white rounded-lg shadow-sm mt-4">
            <td className="flex items-center gap-4 p-4">
              <button
                className="text-xl text-gray-500 hover:text-red-500"
                onClick={() => {
                  setOpen(true);
                  setid(item._id);
                  deleteItmehandler(item._id);
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
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-400">{item.weight}</p>
              </div>
            </td>
            <td className="p-4">₹{item.price}</td>
            <td className="p-4">{fullday}</td>
            <td>
              <button
                className="flex items-center justify-center bg-green-700 text-white border-gray-50 rounded-4xl px-4 py-2"
                onClick={() => addToCartHandler(item, item._id)}
              >
                Move To Cart
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td>No items in whishList</td>
        </tr>
      )}
      <tr>
        <td>
          <AlertNotification open={open} setOpen={setOpen} id={id} />
        </td>
      </tr>
    </>
  );
};

export default WhishList;
