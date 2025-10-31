"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();
  const { cart } = useCart(); // ambil cart dari context
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const [mounted, setMounted] = useState(false); // track client mount

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const navLinks = [{ href: "/", label: "Home" }, ...(isLoggedIn && isAdmin ? [{ href: "/admin", label: "Admin" }] : [{ href: "/store", label: "Store" }]), { href: "/cart", label: "Cart" }];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">🛍️ RevoShop</h1>
        <ul className="flex gap-6 text-gray-700 dark:text-gray-200 font-medium">
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              <button
                onClick={() => router.push(link.href)}
                className={`transition ${pathName === link.href ? "text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1" : "hover:text-indigo-500 dark:hover:text-indigo-300"}`}
              >
                {link.label}
              </button>
              {/* hanya render badge setelah client mount */}
              {link.href === "/cart" && cartCount > 0 && mounted && <span className="absolute -top-3 -right-4 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md">{cartCount}</span>}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button onClick={logout} className="px-4 py-2 text-gray-700 dark:text-gray-500 rounded-lg hover:bg-gray-100 transition font-medium">
              Logout
            </button>
          ) : (
            <button onClick={() => router.push("/login")} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
