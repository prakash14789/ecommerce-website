import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState({ message: '', visible: false });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast(t => ({ ...t, visible: false }));
    }, 3000);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, { ...product, id: Date.now() }]);
    setIsCartOpen(true);
    showToast('Added to Selection');
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <AppContext.Provider value={{
      isMenuOpen, setIsMenuOpen,
      isCartOpen, setIsCartOpen,
      cartItems, addToCart, removeFromCart, clearCart, cartTotal,
      toast, showToast,
      isAdminAuthenticated, setIsAdminAuthenticated,
      isAuthenticated, setIsAuthenticated,
      userInfo, setUserInfo
    }}>
      {children}
    </AppContext.Provider>
  );
};
