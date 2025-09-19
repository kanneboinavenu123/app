
import React from "react";
import { useCart } from "../context/CartContext";


function CartPage() {
    const { cart, removeFromCart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <section className="cart-page">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item">
                                <span>
                                    {item.name} x {item.quantity} = ₹{item.price * item.quantity}
                                </span>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove One
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ₹{total}</h3>
                    <button className="order-btn">Proceed to Checkout</button>
                </>
            )}
        </section>
    );
}

export default CartPage;