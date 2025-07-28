import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authCredentials: (state, action) => {
      state.userInfo = action.payload;
       localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    logOut: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { authCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
