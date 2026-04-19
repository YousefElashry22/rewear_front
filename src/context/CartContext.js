import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCartItems, addToCart as apiAddToCart, updateCartQuantity as apiUpdateCart, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart([]);
      return;
    }
    setLoading(true);
    try {
      const data = await getCartItems();
      setCart(data || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch cart on login or app load
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) return;
    try {
      await apiAddToCart(user.id, productId, quantity);
      await fetchCart(); // Refresh cart after adding
    } catch (err) {
      console.error('Error adding to cart:', err);
      throw err;
    }
  };

  const updateQuantity = async (cartId, quantity) => {
    try {
      await apiUpdateCart(cartId, quantity);
      await fetchCart();
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await apiRemoveFromCart(cartId);
      await fetchCart();
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  const clearCart = async () => {
    try {
      await apiClearCart(user.id);
      setCart([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.products?.price * item.quantity || 0), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartCount, 
      cartTotal, 
      loading, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      clearCart,
      refreshCart: fetchCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
