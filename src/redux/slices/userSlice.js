import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  accessToken: null,
  refreshToken: null,
  userId: null
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;
      
      Cookies.set('accessToken', action.payload.accessToken, { expires: 7 });
      Cookies.set('refreshToken', action.payload.refreshToken, { expires: 7 });
      Cookies.set('userId', action.payload.userId, { expires: 7 });
    },
    clearUser: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
