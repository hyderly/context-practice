import React, { createContext, useState, useEffect } from "react";

import { addItemToCart, removeItemFromCart } from "./cart.utils";

export const CartContext = createContext({
  hidden: true,
  cartItems: [],
  cartItemCount: 0,
  total: 0,
  toggleHidden: () => {},
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [total, setTotal] = useState(0);

  const toggleHidden = () => setHidden(!hidden);
  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));
  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));

  useEffect(() => {
    const count = cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    );

    const total = cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity * cartItem.price,
      0
    );

    setCartItemCount(count);
    setTotal(total);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        cartItemCount,
        addItem,
        removeItem,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
