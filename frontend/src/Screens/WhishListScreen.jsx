import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import WhishList from "../Components/WhishList";
import { addToWishList } from "../Slice/WhishListSlice.js";
import { useGetUserWishListQuery } from "../ApiSlice/whishListSlice.js";
import useAuthUser from "../Hooks/useAuthUser.js";

const WhishListScreen = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userID } = useAuthUser();
  const {
    data: wishListItems,
    isSuccess,
    isLoading
  } = useGetUserWishListQuery(userID);
  console.log("Fetched Wishlist Items:", wishListItems);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
     if(!userID) return;
    if (userID & isSuccess & wishListItems) {
      dispatch(addToWishList(wishListItems.wishList || []));
    }
  }, [userID,isSuccess, dispatch, wishListItems]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-row justify-center items-center gap-8 p-4 sm:p-6 md:p-10 md:gap-3 lg:px-14 lg:gap-5">
        <div className="w-full overflow-x-auto">
          <table cclassName="min-w-full table-auto text-left">
            <thead>
              <tr className="border-2 bg-yellow-500 text-white">
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Date Added</th>
                <th className="p-4">Stock Status</th>
              </tr>
            </thead>
            <tbody>
              <WhishList
                wishListItems={wishListItems}
                isLoading={isLoading}
              />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WhishListScreen;
