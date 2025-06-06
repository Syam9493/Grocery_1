import {createSlice} from '@reduxjs/toolkit';

const initialState = localStorage.getItem("whishList") ? JSON.parse(localStorage.getItem("whishList")) : {whishListItme: []}

const updateWhichList = (state) => {
    localStorage.setItem("whishList", JSON.stringify(state));
}


export const whishListSlice = createSlice({
    name: "whishList",
    initialState,
    reducers: {
        addToWhichList: (state, action) => {
                const item = action.payload;
                const existItem = state.whishList.find((w) => w._id === item);

                if(existItem) {
                    state.whishList = state.whishList.map((items) => items._id === existItem._id ? item : items)
                } else{
                    state.whishList = [...state.whishList, item]
                }
                return updateWhichList(state);
        }
    }

});

export const {addToWhichList} = whishListSlice.actions;

export default whishListSlice.reducer;