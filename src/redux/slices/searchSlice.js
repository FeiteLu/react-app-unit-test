import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//const URL = "https://www.googleapis.com/books/v1/volumes?q=query&startIndex=0&maxResults=20"
export const searchbook = createAsyncThunk(
    "search/searchbook",
    async (_, thunkAPI) => {
        const { keyword, itemsPerPage } =
            thunkAPI.getState().searchSlice;
        const startIndex = 0;
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&startIndex=${startIndex}&maxResults=${itemsPerPage}`
        ).then((res) => res.json());
        console.log("response", response, thunkAPI.getState())
        return response;
    }
);

export const switchPage = createAsyncThunk(
    "search/switchPage",
    async (newPage, thunkAPI) => {
        const { keyword, itemsPerPage } =
            thunkAPI.getState().searchSlice;
        const startIndex = (newPage - 1) * itemsPerPage;
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&startIndex=${startIndex}&maxResults=${itemsPerPage}`
        ).then((res) => res.json());
        return response;
    }
);

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        keyword: "",
        isLoading: false,
        list: [],
        totalPages: 1,
        currentPage: 1,
        itemsPerPage: 10,
    },
    reducers: {
        setKeyword: (state, action) => {
            state.keyword = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchbook.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(searchbook.fulfilled, (state, action) => {
                console.log("fulfilled", action.payload)
                state.isLoading = false;
                state.totalPages = Math.ceil(action.payload.totalItems / state.itemsPerPage)
                state.list = action.payload.items;
            })
            .addCase(searchbook.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(switchPage.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(switchPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.totalPages = Math.ceil(action.payload.totalItems / state.itemsPerPage)
                state.list = action.payload.items;
                state.currentPage = action.meta.arg;//newPage
            })
            .addCase(switchPage.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { setKeyword } = searchSlice.actions;
export default searchSlice.reducer;
