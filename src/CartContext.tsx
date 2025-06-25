import React, { createContext, useContext, useState, useEffect } from 'react';
interface CartItem {
  productId: number;
  size: string;
  quantity: number;
  price: number;
  name: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number, size: string, quantity: number, price: number, name: string) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productId: number, size: string, quantity: number, price: number, name: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === productId && item.size === size
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { productId, size, quantity, price, name }];
    });
  };

  const removeFromCart = (productId: number, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  const updateQuantity = (productId: number, size: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};