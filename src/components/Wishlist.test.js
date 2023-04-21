import { fireEvent, render, screen } from "@testing-library/react";
import Search from "./Search";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../redux/slices/searchSlice";
import wishlistSlice from "../redux/slices/wishlistSlice";
import Wishlist from "./Wishlist"

const createMockStore = (
    preloadedState = {
        searchSlice: {
            keyword: "",
            isLoading: false,
            list: [],
            totalPages: 1,
            currentPage: 1,
            itemsPerPage: 10,
        },
        wishlistSlice: { list: [] },
    }
) => {
    return configureStore({
        reducer: {
            searchSlice,
            wishlistSlice,
        },
        preloadedState,
    });
};

fetch = jest.fn();
describe("wishlist component", () => {
    beforeEach(() => {
        fetch.mockImplementation(() => {
            return new Promise((res, rej) =>
                res({
                    json: () =>
                        new Promise((res, rej) => {
                            res({
                                items: [
                                    {
                                        id: 1,
                                        volumeInfo: {
                                            title: "",
                                            authors: "",
                                            publisher: "",
                                            publishedDate: "",
                                            description: "",
                                            imageLinks: { thumbnail: "" },
                                        },
                                    },
                                    {
                                        id: 2,
                                        volumeInfo: {
                                            title: "",
                                            authors: "",
                                            publisher: "",
                                            publishedDate: "",
                                            description: "",
                                            imageLinks: { thumbnail: "" },
                                        },
                                    },
                                ],
                                totalItems: 2,
                                kind: "",
                            });
                        }),
                })
            );
        });
    });

    test("book in the search component should be added to the wishlist component when they are clicked", async () => {
        render(
            <Provider store={createMockStore()}>
                <Search />
                <Wishlist />
            </Provider>
        );
        const inputEl = screen.getByRole("textbox");
        fireEvent.change(inputEl, { target: { value: "ab" } });
        const submitBtnEl = screen.getByText("Submit");
        fireEvent.click(submitBtnEl);
        const liEls = await screen.findAllByRole("listitem");
        fireEvent.click(liEls[0]);
        const wishlistLis = await screen.getByTestId("wishlist").querySelectorAll("li");
        expect(wishlistLis.length).toBe(1);

    })

    test("book in the wishlist component should be removed when clicked in the wishlist", async () => {
        render(
            <Provider store={createMockStore()}>
                <Search />
                <Wishlist />
            </Provider>
        );
        let placeHolderEl = screen.queryAllByText("Nothing here");
        expect(placeHolderEl[0]).toBeInTheDocument();
        const inputEl = screen.getByRole("textbox");
        fireEvent.change(inputEl, { target: { value: "ab" } });
        const submitBtnEl = screen.getByText("Submit");
        fireEvent.click(submitBtnEl);
        placeHolderEl = screen.queryAllByText("Nothing here");
        expect(placeHolderEl[0]).toBeInTheDocument();
        const liEls = await screen.findAllByRole("listitem");
        fireEvent.click(liEls[0]);
        const wishlistEl = await screen.findByTestId("wishlist");
        const wishlistLis = wishlistEl.querySelectorAll("li");
        fireEvent.click(wishlistLis[0]);
        placeHolderEl = screen.queryAllByText("Nothing here");
        expect(placeHolderEl[0]).toBeInTheDocument();
    })
})