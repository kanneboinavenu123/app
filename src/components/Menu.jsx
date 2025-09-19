


import React from "react";
import { useCart } from "../context/CartContext";

function Menu({ items }) {
  const { addToCart } = useCart();

  return (
    <section className="menu">
      <h2>Popular Dishes</h2>
      <div className="menu-grid">
        {items.map((item) => (
          <div key={item.id} className="card">
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;
