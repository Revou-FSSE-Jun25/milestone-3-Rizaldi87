"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/NavBar";
import { Product } from "@/app/types/product";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/api";

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // tampilkan 8 produk per halaman

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="mt-12 flex-1 max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Admin Dashboard</h1>
          <Link href="/admin/add-product" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md">
            + Add Product
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">No products found.</p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentProducts.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-xl transition-all">
                  <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
                    <img src={product.images?.[0] || "/no-image.png"} alt={product.title} className="object-cover w-full h-full" />
                  </div>
                  <h2 className="font-semibold text-lg line-clamp-2">{product.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{typeof product.category === "object" ? product.category.name : product.category}</p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-2">${product.price}</p>
                  <div className="flex justify-between mt-2">
                    <button onClick={() => router.push("/admin/edit/" + product.id)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center gap-2 mt-6">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50">
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"}`}>
                  {i + 1}
                </button>
              ))}

              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50">
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
