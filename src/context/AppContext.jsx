import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [orderConfirmationStatus, setOrderConfirmationStatus] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart or increment quantity
  const Add_to_Cart = (product) => {
    const existingCartItem = cart.find((item) => item.id === product.id);

    if (existingCartItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  // Remove product from cart
  const Remove_from_Cart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const Clear_Cart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    setOrderConfirmationStatus(false);
  }

  // Increment product quantity
  const Increment_Quantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement product quantity
  const Decrement_Quantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total_Price = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const confirmOrder = () => setOrderConfirmationStatus(prev => !prev);

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        total_Price,
        Add_to_Cart,
        Remove_from_Cart,
        Increment_Quantity,
        Decrement_Quantity,
        orderConfirmationStatus,
        confirmOrder,
        Clear_Cart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
