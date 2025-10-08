import Image from "next/image";
import Navbar from "@/components/NaviBar";
import { Product } from "@/app/types/product";
import ProductImages from "@/components/ProductImage";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      cache: "no-store", // SSR
    });
    if (!res.ok) throw new Error("Gagal mengambil data produk");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Gagal mengambil data produk:", error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = await params.id;
  const product = await getProductById(productId);

  function changeImage(img: string) {
    const imageElement = document.getElementById("product-image") as HTMLImageElement;
    imageElement.src = img;
  }

  if (!product) {
    return <div className="text-center text-red-600 p-10">Produk tidak ditemukan 😢</div>;
  }

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="max-w-6xl mx-auto mt-12 p-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* 🖼️ Carousel Gambar */}
        <ProductImages images={product.images} title={product.title} />

        {/* 🧾 Info Produk */}
        <div className="space-y-6">
          <Link href="/store" className="inline-block mb-4 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline transition">
            ⬅️ Back to Store
          </Link>
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Kategori: <span className="text-indigo-600 dark:text-indigo-400 font-medium">{typeof product.category === "object" ? product.category.name : product.category}</span>
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${product.price}</span>

            <AddToCartButton product={product} />
          </div>

          <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-semibold mb-3">📦 Product Details</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li>🧾 ID: {product.id}</li>
              <li>🏷️ Category: {typeof product.category === "object" ? product.category.name : product.category}</li>
              <li>💰 Price: ${product.price}</li>
              <li>🌐 Source: Platzi Fake API</li>
            </ul>
          </div>
        </div>
      </main>

      {/* ⚓ Footer */}
      <footer className="mt-auto py-6 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">© {new Date().getFullYear()} RevoShop — All Rights Reserved</footer>
    </div>
  );
}
