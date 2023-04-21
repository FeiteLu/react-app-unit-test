import { createSlice } from '@reduxjs/toolkit'

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    list: [],
  },
  reducers: {
    addBook: (state, action) => {
      const newItem = action.payload
      if(!state.list.some(item=>item.id === newItem.id)){
         state.list.push(newItem)
      }
    },
    removeBook: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter(item=>item.id!==id);
    }
  },
})


export const { addBook, removeBook } = wishlistSlice.actions;
export default wishlistSlice.reducer;