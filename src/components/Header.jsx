import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { cartCount } = useCart();

  return (
    <header className="header">
      <h1 className="logo">Foodie</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Menu</Link></li>
          <li><Link to="/cart">🛒 [ {cartCount} ]</Link></li>
          <li><Link to="/">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
