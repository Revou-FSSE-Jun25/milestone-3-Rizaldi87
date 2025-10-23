"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Product } from "@/app/types/product";

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  changeQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Hanya jalankan di client untuk menghindari hydration mismatch
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // --- Fungsi helper untuk update cart dan localStorage sekaligus ---
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated")); // notify komponen lain (misal Navbar)
  };

  const addToCart = (product: Product) => {
    const existing = cart.find((p) => p.id === product.id);
    const newCart = existing ? cart.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)) : [...cart, { ...product, quantity: 1 }];

    updateCart(newCart);
    alert(`${product.title} added to cart!`);
  };

  const removeFromCart = (id: number) => {
    updateCart(cart.filter((p) => p.id !== id));
  };

  const changeQuantity = (id: number, delta: number) => {
    updateCart(cart.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p)));
  };

  const clearCart = () => updateCart([]);

  const totalPrice = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQuantity, clearCart, totalPrice }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
