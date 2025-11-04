"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api";
import Loading from "@/app/loading";
import Pagination from "./Pagination";
import ProductSearch from "./ProductSearch";
import { useSearchParams } from "next/navigation";

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts(); // fetch semua produk
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(searchQuery));

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  if (loading) return <Loading />;

  return (
    <div>
      {/* <ProductSearch /> */}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages} // sekarang ada
      />

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        Show {currentProducts.length} of {products.length} products
      </div>
    </div>
  );
}
