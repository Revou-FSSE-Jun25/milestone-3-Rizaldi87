"use client";

import { Product } from "@/app/types/product";
import { useEffect, useState } from "react";

function AddToCartButton({ product }: { product: Product }) {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  function addToCart(product: Product) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      // Kalau sudah ada, tambahkan quantity
      existing.quantity += 1;
    } else {
      // Kalau belum ada, buat property quantity
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${product.title} added to cart!`);
  }
  return (
    <button onClick={() => addToCart(product)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition-all shadow-md">
      Add to cart
    </button>
  );
}

export default AddToCartButton;
