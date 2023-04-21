import React from 'react'
import Booklist from './Booklist';
import { useSelector, useDispatch } from "react-redux"
import { removeBook } from '../redux/slices/wishlistSlice';

const Wishlist = () => {
  const list = useSelector(state => state.wishlistSlice.list);
  const dispatch = useDispatch();
  const handleClickBook = (item) => {
    dispatch(removeBook(item.id))
  }
  return (
    <div className='wishlist-container' data-testid="wishlist">
      <Booklist list={list} onClickBook={handleClickBook} />
    </div>
  )
}

export default Wishlist