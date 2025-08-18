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
//     setCheckItems(state, action) {
//       const item = action.payload;
//       const existItem = state.checkItems.find((items) => items === item)
//       if(existItem){
//           state.checkItems = state.checkItems.map(items => items === existItem ? item : items );
//       } else {
//         state.checkItems = [...state.checkItems, item];
//       }
//   return updateCheckItems(state);
// },
setCheckItems(state, action) {
  const item = action.payload;

  if (item.type === "category") {
    const exists = state.checkItems.some(
      (i) => i.type === "category" && i.value === item.value
    );

    if (exists) {
      state.checkItems = state.checkItems.filter(
        (i) => !(i.type === "category" && i.value === item.value)
      );
    } else {
      state.checkItems.push(item);
    }
  } else {
    const exists = state.checkItems.some((i) => i.type === item.type);

    if (exists) {
      state.checkItems = state.checkItems.map((i) =>
        i.type === item.type ? item : i
      );
    } else {
      state.checkItems.push(item);
    }
  }
  // ✅ always update after state mutation
 return  updateCheckItems(state);
},


    addCheckItem: (state, action) => {
      state.push(action.payload); // adds one item
    },
    removeCheckItem: (state, action) => {
  state.checkItems = state.checkItems.filter(
    (item) =>
      !(item.type === action.payload.type && item.value === action.payload.value)
  );
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