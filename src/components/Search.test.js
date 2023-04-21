import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Search from "./Search";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../redux/slices/searchSlice";
import wishlistSlice from "../redux/slices/wishlistSlice";

//user story
//accessibility

const createMockStore = (
    preloadedState = {
        searchSlice: {
            keyword: "",
            isLoading: false,
            list: [],
            totalPages: 2,
            currentPage: 1,
            itemsPerPage: 1,
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

fetch = jest.fn(); //dummy function
describe("search component", () => {
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
    test("search input should respond to user key press", () => {
        //mock store

        render(
            <Provider store={createMockStore()}>
                <Search />
            </Provider>
        );
        const inputEl = screen.getByRole("textbox");
        expect(inputEl).toBeInTheDocument();
        fireEvent.change(inputEl, { target: { value: "ab" } });
        expect(inputEl).toHaveValue("ab");
    });

    test("search result should show up after type some keyword, and clicking the submit button ", async () => {
        render(
            <Provider store={createMockStore()}>
                <Search />
            </Provider>
        );
        let liEls;
        const placeHolderEl = screen.getByText("Nothing here");
        expect(placeHolderEl).toBeInTheDocument();
        const inputEl = screen.getByRole("textbox");
        fireEvent.change(inputEl, { target: { value: "ab" } });
        expect(inputEl).toHaveValue("ab");
        await waitFor(() => { }, {
            timeout: 200,
        });
        liEls = screen.queryAllByRole("listitem");
        expect(liEls).toHaveLength(0);
        /* liEls = await screen.findAllByRole("listitem");
        expect(liEls).toHaveLength(2); */

        const submitBtnEl = screen.getByText("Submit");
        fireEvent.click(submitBtnEl);
        liEls = await screen.findAllByRole("listitem"); //what makes code async, promise, async await, settimeout
        expect(liEls).toHaveLength(2);
    });

    test("loader should show up when the data is loading after clicking submit button", async () => {
        render(
            <Provider store={createMockStore()}>
                <Search />
            </Provider>
        );
        let loaderEl = screen.queryByTestId("loader");
        expect(loaderEl).not.toBeInTheDocument();
        const inputEl = screen.getByRole("textbox");
        fireEvent.change(inputEl, { target: { value: "ab" } });
        const submitBtnEl = screen.getByText("Submit");
        fireEvent.click(submitBtnEl);
        loaderEl = screen.queryByTestId("loader");
        expect(loaderEl).toBeInTheDocument();
        //wait the request to be fulfilled, get the loader element again
        await waitFor(() => {
            const loader = screen.queryByTestId("loader");
            expect(loader).not.toBeInTheDocument();
        });
    });



    test("the app should turn to the next page when click the next button and turn to the previous page when cilck the prev button", async () => {
        render(
            <Provider store={createMockStore()}>
                <Search />
            </Provider>
        );
        const inputEl = screen.getByRole("textbox");
        fireEvent.change(inputEl, { target: { value: "ab" } });
        const submitBtnEl = screen.getByText("Submit");
        fireEvent.click(submitBtnEl);
        let paginationEl = await screen.findByTestId("pagination");
        expect(paginationEl.textContent.split("/")[0]).toEqual("1");
        const nextBtnEl = await screen.findByText("next")
        fireEvent.click(nextBtnEl);
        paginationEl = await screen.findByTestId("pagination");
        expect(paginationEl.textContent.split("/")[0]).toEqual("2");
        const prevBtnEl = await screen.findByText("prev")
        fireEvent.click(prevBtnEl);
        paginationEl = await screen.findByTestId("pagination");
        expect(paginationEl.textContent.split("/")[0]).toEqual("1");
    });


});
