"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { isAdmin } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      router.push(`/${isAdmin ? "admin" : "store"}`);
      return;
    }

    // ubah ke slug (huruf kecil + ganti spasi jadi '-')
    router.push(`/${isAdmin ? "admin" : "store"}?search=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 items-center w-full max-w-md mx-auto mb-8">
      <input
        role="search"
        type="text"
        placeholder="🔍 Cari produk..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none 
                   focus:ring-2 focus:ring-indigo-500 transition"
      />
      <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition">
        Cari
      </button>
    </form>
  );
}
