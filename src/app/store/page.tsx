import Navbar from "@/components/NavBar";

import ProductList from "@/components/ProductList";
import ProductSearch from "@/components/ProductSearch";

export default async function StorePage() {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="mt-12 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 px-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">Our Products</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
              Only Best Products in <span className="font-semibold">RevoShop</span>
            </p>
          </div>

          <ProductSearch />

          <ProductList />
        </div>
      </main>
    </div>
  );
}
