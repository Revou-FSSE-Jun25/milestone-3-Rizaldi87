"use client";

import { getCookie, isAuthenticated, logout } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter;
  const pathName = usePathname();
  const [cartCount, setCartCount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Ambil jumlah item cart dari localStorage
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    setIsAdmin(getCookie("role") === "admin");
    function updateCartCount() {
      const stored = localStorage.getItem("cart");
      const cart = stored ? JSON.parse(stored) : [];
      setCartCount(cart.length);
      window.addEventListener("cartUpdated", updateCartCount);

      return () => window.removeEventListener("cartUpdated", updateCartCount);
    }

    updateCartCount();

    // Update otomatis ketika localStorage berubah (misal dari AddToCartButton)
    window.addEventListener("storage", updateCartCount);

    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  const navLinks = [{ href: "/", label: "Home" }, ...(isLoggedIn && isAdmin ? [{ href: "/admin", label: "Admin" }] : [{ href: "/store", label: "Store" }]), { href: "/cart", label: "Cart" }];

  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      logout(router);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🛍️ Logo */}
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">🛍️ RevoShop</h1>

        {/* 🔗 Navigation Links */}
        <ul className="flex gap-6 text-gray-700 dark:text-gray-200 font-medium">
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className={`transition ${pathName === link.href ? "text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1" : "hover:text-indigo-500 dark:hover:text-indigo-300"}`}
              >
                {link.label}
              </Link>

              {/* 🛒 Badge khusus Cart */}
              {link.href === "/cart" && cartCount > 0 && <span className="absolute -top-3 -right-4 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md">{cartCount}</span>}
            </li>
          ))}
        </ul>

        {/* 👤 Action Buttons */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="px-4 py-2  text-gray-700 dark:text-gray-500 rounded-lg hover:bg-gray-100 transition font-medium">
              Logout
            </button>
          ) : (
            <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
