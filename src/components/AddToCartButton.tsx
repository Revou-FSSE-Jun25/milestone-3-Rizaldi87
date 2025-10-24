"use client";

import { Product } from "@/app/types/product";
import { useCart } from "@/context/CartContext";

function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button onClick={() => addToCart(product)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition-all shadow-md">
      Add to cart
    </button>
  );
}

export default AddToCartButton;
