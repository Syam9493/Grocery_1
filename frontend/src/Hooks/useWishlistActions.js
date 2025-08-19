import {
  useAddToWishListMutation,
  useDeleteFromWishListMutation,
} from "../ApiSlice/whishListSlice.js";
import { toast } from "react-toastify";

import useAuthUser from "./useAuthUser.js";

const useWishlistActions = () => {
  const [addToWishList] = useAddToWishListMutation();
  const [deleteFromWishList] = useDeleteFromWishListMutation();
  const { userID } = useAuthUser();

  const handleAddToWishlist = async (product) => {
    if (!userID || userID === "null" || userID === null) {
      toast.error("You must be logged in to add to wishlist");
      return;
    }
    try {
      const res = await addToWishList({ userID, product }).unwrap();
      toast.success(res.message || "Product added to wish list!");
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
    }
  };

  const handleRemoveFromWishlist = async (productID) => {
    if (!userID || userID === "null" || userID === null) {
      toast.error("You must be logged in to add to wishlist");
      return;
    }
    try {
      const res = await deleteFromWishList({ userID, productID }).unwrap();
      toast.info(res.message || "Product removed from wish list!");
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    }
  };

  return { handleAddToWishlist, handleRemoveFromWishlist };
};

export default useWishlistActions;
