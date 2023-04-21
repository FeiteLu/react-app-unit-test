import { configureStore } from '@reduxjs/toolkit'
import searchSlice from "./slices/searchSlice";
import wishlistSlice from './slices/wishlistSlice';
export default configureStore({
  reducer: {
    searchSlice,
    wishlistSlice
  },
})