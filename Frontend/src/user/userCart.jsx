import React, { useState } from "react";
import "./userCart.css"; // We'll create this CSS file next

const UserCart = () => {
  // Dummy cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product A",
      image: "https://via.placeholder.com/150",
      price: 20,
      quantity: 2,
    },
    {
      id: 2,
      name: "Product B",
      image: "https://via.placeholder.com/150",
      price: 30,
      quantity: 1,
    },
    {
      id: 3,
      name: "Product C",
      image: "https://via.placeholder.com/150",
      price: 25,
      quantity: 3,
    },
  ]);

  // Function to handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <div className="quantity-controls">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default UserCart;