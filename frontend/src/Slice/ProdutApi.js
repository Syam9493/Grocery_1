// features/checkItems/checkItemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkItems: [],
};

const checkItemsSlice = createSlice({
  name: 'checkItems',
  initialState,
  reducers: {
    setCheckItems(state, action) {
  state.checkItems = action.payload;
},
    addCheckItem: (state, action) => {
      state.push(action.payload); // adds one item
    },
    removeCheckItem: (state, action) => {
      return state.filter(item => item.id !== action.payload); // assumes each item has an id
    },
    clearCheckItems: () => {
      return [];
    }
  }
});

export const { setCheckItems, addCheckItem, removeCheckItem, clearCheckItems } = checkItemsSlice.actions;
export default checkItemsSlice.reducer;