import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("wishList")
  ? JSON.parse(localStorage.getItem("wishList"))
  : { wishListItems: [] };

const updateWhishList = (wishListItems) => {
  localStorage.setItem("wishList", JSON.stringify(wishListItems));
  return wishListItems;
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const item = action.payload;
      const existItem = state.wishListItems.find((w) => w._id === item._id);

      if (existItem) {
        state.wishListItems = state.wishListItems.map((w) =>
          w._id === existItem._id ? item : w
        );
      } else {
        state.wishListItems.push(item);
      }

      // Sync to localStorage (synchronously)
      //localStorage.setItem("wishList", JSON.stringify(state));
      return updateWhishList(state);
    },
    deletefromWhishList: (state, action) => {
      state.wishListItems = state.wishListItems.filter(
        (x) => x._id !== action.payload
      );
      return updateWhishList(state);
    },
  },
});

export const { addToWishList, deletefromWhishList } = wishListSlice.actions;

export default wishListSlice.reducer;
