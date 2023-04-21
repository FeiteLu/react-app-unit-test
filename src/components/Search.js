import React, { useCallback, useEffect, useState } from "react";
import Booklist from "./Booklist";
import { useSelector, useDispatch } from "react-redux";
import {
    searchbook,
    setKeyword,
    switchPage,
} from "../redux/slices/searchSlice";
import { addBook } from "../redux/slices/wishlistSlice";

import { debounce, throttle } from "lodash";

let prevFoo;


const Search = () => {
    const keyword = useSelector((state) => state.searchSlice.keyword);
    const isLoading = useSelector((state) => state.searchSlice.isLoading);
    const currentPage = useSelector((state) => state.searchSlice.currentPage);
    const totalPages = useSelector((state) => state.searchSlice.totalPages);
    const dispatch = useDispatch();
    const list = useSelector((state) => state.searchSlice.list);
    //useRef, useCallback

    //const debouncedSearchbook = debounce(()=>{dispatch(searchbook())}, 1000);

    const foo = () => {

    }
    prevFoo = foo;

    const memoizedDebouncedSearchbook = useCallback(
        debounce(() => {
            console.log("dispatch", performance.now())
            dispatch(searchbook());
        }, 1000),
        [dispatch]
    );

    useEffect(() => {
        if (keyword.trim() === "") return
        console.log("keyword", keyword, performance.now())
        memoizedDebouncedSearchbook();
        //dispatch(searchbook());
    }, [keyword, memoizedDebouncedSearchbook]);

    const handleChange = (e) => {
        dispatch(setKeyword(e.target.value));
    };
    const handleSubmit = () => {
        dispatch(searchbook());
    };
    const handleClickBook = (item) => {
        dispatch(addBook(item));
    };

    const handleClickPrev = () => {
        if (currentPage <= 1) return;
        dispatch(switchPage(currentPage - 1));
    };
    const handleClickNext = () => {
        if (currentPage >= totalPages) return;
        dispatch(switchPage(currentPage + 1));
    };
    return (
        <div className="search-container">
            <div>
                <input value={keyword} onChange={handleChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            {isLoading ? (
                <span className="loader" data-testid="loader"></span>
            ) : (
                <Booklist
                    onClickBook={handleClickBook}
                    list={list}
                    onClickPrev={handleClickPrev}
                    onClickNext={handleClickNext}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    );
};

export default Search;
