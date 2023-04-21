import React from "react";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import Search from "./Search";
import Wishlist from "./Wishlist";

const Layout = () => {
    return (
        <div>
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Search />} />
                    <Route path="search" element={<Search />} />
                    <Route path="wishlist" element={<Wishlist />} />
                </Routes>
            </main>
        </div>
    );
};

export default Layout;
