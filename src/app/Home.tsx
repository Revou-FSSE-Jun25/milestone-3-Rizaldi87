import CategoryCarousel from "@/components/CategoryCarousel";
import NavBar from "@/components/NavBar";
import PopularProducts from "@/components/PopularProducts";
import Link from "next/link";

export default async function Home() {
  // const router = useRouter();

  // harus langsung fetch ke platzi tidak melalu api routes
  // karena ssg harus menggunakan absolute path
  const products = await fetch("https://api.escuelajs.co/api/v1/products", {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());
  const categories = await fetch("https://api.escuelajs.co/api/v1/categories", {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());
  return (
    <>
      <NavBar />
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Discover Your Dream Products at <span className="text-yellow-300">RevoShop</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">Shop easily, quickly, and affordably — all in one place.</p>
          <Link href="/store" className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300">
            Shop Now
          </Link>
        </div>
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-cover bg-center opacity-10"></div>
      </section>

      <section className="max-w-6xl mx-auto w-full py-12 px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 text-center">Featured Categories</h2>
        {categories ? <CategoryCarousel categories={categories} /> : <div className="bg-red-900/90 text-red-100 px-4 py-3 rounded-lg border border-red-700 text-center">❌ Failed to load categories</div>}
      </section>

      <section className="max-w-6xl mx-auto w-full py-12 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 text-center">Popular Products</h2>
          <Link href="/store" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
            View All →
          </Link>
        </div>

        {products ? (
          <PopularProducts products={products.slice(0, 8)} /> // show 8 products
        ) : (
          <div className="bg-red-900/90 text-red-100 px-4 py-3 rounded-lg border border-red-700 text-center">❌ Failed to load products</div>
        )}
      </section>

      <section className="relative bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white py-16 mt-10 text-center">
        <h2 className="text-3xl font-bold mb-4">🔥 Special Deals This Week!</h2>
        <p className="text-lg mb-6">
          Get up to <span className="font-extrabold text-yellow-200">50% off</span> on selected items.
        </p>
        <Link href="/store" className="bg-white text-red-600 font-bold px-8 py-3 rounded-lg shadow hover:bg-gray-100 transition-all duration-300">
          Check Now
        </Link>
      </section>

      <section className="max-w-5xl mx-auto w-full py-12 px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "How do I place an order?",
              a: "Select the product you want, then click “Buy Now” or add it to your cart.",
            },
            {
              q: "Is delivery available throughout Indonesia?",
              a: "Yes, we partner with multiple couriers to deliver across all regions of Indonesia.",
            },
            {
              q: "What payment methods are available?",
              a: "We accept debit/credit cards, bank transfers, and popular e-wallets like OVO, GoPay, and Dana.",
            },
          ].map((faq, idx) => (
            <details key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <summary className="font-semibold cursor-pointer">{faq.q}</summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-auto border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} RevoShop. All rights reserved.</p>
        <p>Powered by Platzi Fake API</p>
      </footer>
    </>
  );
}
