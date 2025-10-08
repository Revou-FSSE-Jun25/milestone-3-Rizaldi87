"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/store", label: "Store" },
    { href: "/cart", label: "Cart" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">🛍️ RevoShop</h1>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-gray-700 dark:text-gray-200 font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition ${pathName === link.href ? "text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1" : "hover:text-indigo-500 dark:hover:text-indigo-300"}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Tombol Login */}
          <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
