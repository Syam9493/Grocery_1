// features/checkItems/checkItemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('checkItems') ? JSON.parse(localStorage.getItem('checkItems')) : {
  checkItems: []
};

const updateCheckItems = (items) => {
  localStorage.setItem('checkItems', JSON.stringify(items))
  return items;
}

const checkItemsSlice = createSlice({
  name: 'checkItems',
  initialState,
  reducers: {
    setCheckItems(state, action) {
      const item = action.payload;
      const existItem = state.checkItems.find((items) => items === item)
      if(existItem){
          state.checkItems = state.checkItems.map(items => items === existItem ? item : items );
      } else {
        state.checkItems = [...state.checkItems, item];
      }
  return updateCheckItems(state);
},
    addCheckItem: (state, action) => {
      state.push(action.payload); // adds one item
    },
    removeCheckItem: (state, action) => {
      console.log(action.payload);
      state.checkItems = state.checkItems.filter((acc, index)=> index !== action.payload); // assumes each item has an id
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