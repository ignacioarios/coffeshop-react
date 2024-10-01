
import { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getCart, createCart, updateCart } from '../services/apiService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cookies, setCookie] = useCookies(['cartId']);

  useEffect(() => {
    const initializeCart = async () => {
      if (!cookies.cartId) {
        const newCartId = Date.now().toString();
        const created = await createCart(newCartId);

        if (created.success) {
          setCookie('cartId', newCartId, { path: '/' });
        }
      } else {
        const cartId = String(cookies.cartId);
        const cartData = await getCart(cartId);

        if (!cartData.fail) {
          setCart(cartData.data || []);
        }
      }
    };

    initializeCart();
  }, [cookies.cartId, setCookie]);

  const addToCart = async (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    const cartId = String(cookies.cartId);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );
      setCart(updatedCart);
      await updateCart(cartId, updatedCart);
    } else {
      const updatedCart = [...cart, { ...product }];
      setCart(updatedCart);
      await updateCart(cartId, updatedCart);
    }
  };

  const emptyCart = async () => {
    const cartId = String(cookies.cartId);
    setCart([]);
    await updateCart(cartId, []);
  };

  const updateQuantity = async (productId, newQuantity) => {
    const cartId = String(cookies.cartId);
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    await updateCart(cartId, updatedCart);
  };

  const removeItem = async (productId) => {
    const cartId = String(cookies.cartId);
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    await updateCart(cartId, updatedCart);
  };

  const value = { cart, addToCart, emptyCart, updateQuantity, removeItem };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};