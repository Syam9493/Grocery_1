// features/checkItems/checkItemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('checkItems') ? JSON.parse(localStorage.getItem('checkItems')) : {
  checkItems: []
};

const updateCheckItems = (items) => {
  localStorage.setItem('checkItems', JSON.stringify(items))
}

const checkItemsSlice = createSlice({
  name: 'checkItems',
  initialState,
  reducers: {
    setCheckItems(state, action) {
  state.checkItems = action.payload;
  return updateCheckItems(state);
},
    addCheckItem: (state, action) => {
      state.push(action.payload); // adds one item
    },
    removeCheckItem: (state, action) => {
      console.log(action.payload);
      state.checkItems = state.checkItems.filter((_,index)=> index !== action.payload); // assumes each item has an id
       return updateCheckItems(state);
    },
    clearCheckItems: (state) => {
       state.checkItems = [];
      return updateCheckItems(state);
    }
  }
});

export const { setCheckItems, addCheckItem, removeCheckItem, clearCheckItems } = checkItemsSlice.actions;
export default checkItemsSlice.reducer;