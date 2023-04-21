import { fireEvent, render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Header from "./Header"


describe("header component", () => {
    test("Page should be redirected to wishlist page when the wishlist link is clicked and go to search page when the search link is clicked", () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )

        const wishlistLinkEl = screen.getByText("Wishlist");
        fireEvent.click(wishlistLinkEl);
        expect(window.location.pathname).toContain("wishlist");

        const searchLinkEl = screen.getByText("Search");
        fireEvent.click(searchLinkEl);
        expect(window.location.pathname).toContain("search"); ``
    })
})