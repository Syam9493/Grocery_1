import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ClipLoader } from "react-spinners";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { addToWishList } from "../Slice/WhishListSlice";
import { deletefromCart } from "../Slice/cartSlice";
import { useDeleteFromCartMutation } from "../ApiSlice/cartApi.js";
import useAuthUser from "../Hooks/useAuthUser.js";

const CartAlert = ({ open, setOpen, id, refetch }) => {
  //const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const [DeleteFromCart] = useDeleteFromCartMutation();

   const { userID } = useAuthUser();

  const addToWishListHandler = async () => {
    try {
      dispatch(addToWishList(id)); // Assuming you only need ID
      dispatch(deletefromCart(id));

      toast.success("Product added to WishList", {
        autoClose: 1000,
        theme: "colored",
      });

      setOpen(false); // Close modal after moving to wishlist
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Error adding to wishlist!");
    }finally {
      setOpen(false); // Always close the dialog
    }
  };

  // const deleteItemHandler = async () => {
  //   try {
  //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //     const userID = userInfo?._id;

  //    const  itemID = id;

  //     setLoading(true);

  //     await DeleteFromCart({ userID, itemID }).unwrap(); // 👈 pass correct object to backend

  //     await refetch(); // Wait for fresh data before closing modal

  //     toast.error("Product deleted from Cart!", {
  //       autoClose: 1000,
  //       theme: "colored",
  //     });

  //     setOpen(false); // ✅ Close after update
  //   } catch (err) {
  //     console.error("DELETE FAILED:", err);
  //     toast.error("Error deleting product!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const deleteItemHandler = async () => {

    const itemID = id;

    try {
      const result = await DeleteFromCart({ userID, itemID }).unwrap();
      await refetch();
      toast.info(result.message, { autoClose: 1000, theme: "colored" }); // Show toast first
    } catch (err) {
      console.error("DELETE FAILED:", err);
      toast.error("Error deleting product!", { autoClose: 1000, theme: "colored" });
    } finally {
      setOpen(false); // Always close the dialog
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <ClipLoader size={100} />
  //     </div>
  //   );
  // }

  return (
    <>
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
            <div className="bg-white p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon
                    className="h-10 w-10 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Remove Item from Cart
                  </DialogTitle>
                  <p className="mt-2 text-sm text-gray-500">
                    Are you sure you want to remove this item from your cart?
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2">
              <button
                type="button"
                onClick={addToWishListHandler}
                className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
              >
                Move to Wishlist
              </button>
              <button
                type="button"
                onClick={deleteItemHandler}
                className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
              >
                Remove
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog> 
    </>
  );
};

export default CartAlert;
