import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const updateAuth = (authUser) => {
  localStorage.setItem('userInfo', JSON.stringify(authUser));
  return authUser;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authCredentials: (state, action) => {
      const user = action.payload;
      state.userInfo = updateAuth(user);
    },
    logOut: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { authCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
