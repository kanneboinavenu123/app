import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { CartProvider } from "./context/CartContext";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";

const foodItems = [
    { id: 1, name: "Burger", price: 120, img: "https://via.placeholder.com/150" ,alt:"ok" },
    { id: 2, name: "Pizza", price: 250, img: "https://via.placeholder.com/150" },
    { id: 3, name: "Pasta", price: 180, img: "https://via.placeholder.com/150" },
    { id: 4, name: "Biryani", price: 220, img: "https://via.placeholder.com/150" },
];

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="app">
                    <Header />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Hero />
                                    <Menu items={foodItems} />
                                </>
                            }
                        />
                        <Route path="/cart" element={<CartPage />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;

