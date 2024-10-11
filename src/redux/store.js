import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Import the user slice

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;