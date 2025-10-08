import Navbar from "@/components/NaviBar";
import ProductCard from "@/components/ProductCard";

// Fetch Produk (pakai SSG + revalidate)
async function getProducts() {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/products", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Gagal mengambil data produk");
    return res.json();
  } catch (error) {
    console.error("❌ Gagal mengambil data produk:", error);
    return null;
  }
}

export default async function StorePage() {
  const products = await getProducts();

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

          {!products && <div className="text-center bg-red-100 text-red-700 px-4 py-3 rounded-lg border border-red-300">Gagal memuat data produk 😢</div>}

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products?.slice(0, 20).map((product: any) => (
              <ProductCard {...product} />
            ))}
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-12">
            <p>Show {products?.length || 0} product from Platzi Fake Store API</p>
          </div>
        </div>
      </main>
    </div>
  );
}
