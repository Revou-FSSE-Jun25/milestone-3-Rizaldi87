"use client";

import { useCart } from "@/context/CartContext";
import { isAuthenticated } from "@/lib/auth";
import { useState, useEffect } from "react";
import Navbar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, changeQuantity, clearCart, totalPrice } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const checkOut = () => {
    if (!isLoggedIn) {
      alert("Please Login First!");
      return;
    }
    router.push("/checkout");
    clearCart();
    // alert("Checkout Success!");
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="p-6 mt-20 w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">🛒 Keranjang Belanja</h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-300">
            <p>Cart Still Empty.</p>
            <Link href="/store" className="text-indigo-600 hover:underline mt-2 block">
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white dark:bg-gray-800 shadow p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <Image src={item.images[0]} alt={item.title} width={60} height={60} className="rounded-md object-cover" unoptimized />
                  <div>
                    <h2 className="font-semibold dark:text-white">{item.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">$ {item.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-medium bg-white dark:bg-gray-800 border border-red-500 dark:border-red-700 px-4 py-2 rounded-lg">
                    Remove
                  </button>

                  <div className="ml-4 flex items-center gap-2">
                    <button
                      onClick={() => changeQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      −
                    </button>
                    <p className="w-6 text-center text-gray-600 dark:text-gray-300 font-medium">{item.quantity}</p>
                    <button
                      onClick={() => changeQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end mt-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">Total: ${totalPrice.toLocaleString()}</p>
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={checkOut} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
