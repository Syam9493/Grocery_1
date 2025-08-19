// import { useSelector } from "react-redux";

// const useWishListItemIDs = () => {
//   const wishListItems = useSelector(
//     (state) => state.wishList?.wishListItems ?? []
//   );

//   const wishListItemIDs = wishListItems.flatMap(
//     (list) => list.products?.flatMap((p) => p?.productID ?? []) ?? []
//   );

//   console.log("Wish List Item IDs:", wishListItemIDs);

//   return [...new Set(wishListItemIDs)];  // return unique IDs
// };

// export default useWishListItemIDs;

import { useMemo } from "react";
import { useSelector } from "react-redux";

const useWishListItemIDs = () => {
  const wishListItems = useSelector(
    (state) => state.wishList?.wishListItems ?? []
  );

  const wishListItemIDs = useMemo(() => {
    const ids = wishListItems.flatMap(
      (list) => list.products?.flatMap((p) => p?.productID ?? []) ?? []
    );
    //console.log("Calculated Wish List Item IDs:", ids); // Debug log
    return [...new Set(ids)]; // return unique IDs
  }, [wishListItems]); // Only recalculate when wishListItems changes

  return wishListItemIDs;
};

export default useWishListItemIDs;
