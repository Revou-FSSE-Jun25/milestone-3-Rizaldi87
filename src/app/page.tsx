import NavBar from "@/components/NaviBar";
import PopularProducts from "@/components/PopularProducts";
import CategoryCarousel from "@/components/CategoryCarousel";
import Link from "next/link";

// 🛍️ Fetch Produk
async function fetchProducts() {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/products", {
      cache: "force-cache",
    });
    if (!res.ok) throw new Error("Gagal mengambil data produk");
    return await res.json();
  } catch (error) {
    console.error("❌ Gagal mengambil data produk:", error);
    return null;
  }
}

// 🗂️ Fetch Kategori
async function fetchCategories() {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories", {
      cache: "force-cache",
    });
    if (!res.ok) throw new Error("Gagal mengambil data kategori");
    return await res.json();
  } catch (error) {
    console.error("❌ Gagal mengambil data kategori:", error);
    return null;
  }
}

export default async function Home() {
  const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* 🔝 Navbar */}
      <NavBar />

      {/* 🏠 Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Temukan Produk Impianmu di <span className="text-yellow-300">RevoShop</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">Belanja mudah, cepat, dan hemat — semua dalam satu tempat.</p>
          <Link href="/store" className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300">
            Belanja Sekarang
          </Link>
        </div>
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-cover bg-center opacity-10"></div>
      </section>

      {/* 🧭 Kategori */}
      <section className="max-w-6xl mx-auto w-full py-12 px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 text-center">Kategori Pilihan</h2>
        {categories ? <CategoryCarousel categories={categories} /> : <div className="bg-red-900/90 text-red-100 px-4 py-3 rounded-lg border border-red-700 text-center">❌ Gagal memuat kategori</div>}
      </section>

      {/* 🎯 Produk Populer */}
      <section className="max-w-6xl mx-auto w-full py-12 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">Produk Populer</h2>
          <Link href="/store" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
            Lihat Semua →
          </Link>
        </div>

        {products ? (
          <PopularProducts products={products.slice(0, 8)} /> // tampilkan 8 produk
        ) : (
          <div className="bg-red-900/90 text-red-100 px-4 py-3 rounded-lg border border-red-700 text-center">❌ Gagal memuat produk</div>
        )}
      </section>

      {/* 💥 Promo Banner */}
      <section className="relative bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white py-16 mt-10 text-center">
        <h2 className="text-3xl font-bold mb-4">🔥 Promo Spesial Minggu Ini!</h2>
        <p className="text-lg mb-6">
          Dapatkan <span className="font-extrabold text-yellow-200">diskon hingga 50%</span> untuk produk pilihan.
        </p>
        <Link href="/store" className="bg-white text-red-600 font-bold px-8 py-3 rounded-lg shadow hover:bg-gray-100 transition-all duration-300">
          Cek Sekarang
        </Link>
      </section>

      {/* ❓ FAQ */}
      <section className="max-w-5xl mx-auto w-full py-12 px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 text-center">Pertanyaan Umum</h2>
        <div className="space-y-4">
          {[
            {
              q: "Bagaimana cara memesan produk?",
              a: "Pilih produk yang kamu inginkan, lalu klik tombol “Beli Sekarang” atau tambahkan ke keranjang.",
            },
            {
              q: "Apakah pengiriman tersedia di seluruh Indonesia?",
              a: "Ya, kami bekerja sama dengan berbagai ekspedisi untuk menjangkau seluruh wilayah Indonesia.",
            },
            {
              q: "Metode pembayaran apa saja yang tersedia?",
              a: "Kami menerima kartu debit/kredit, transfer bank, dan e-wallet populer seperti OVO, GoPay, dan Dana.",
            },
          ].map((faq, idx) => (
            <details key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <summary className="font-semibold cursor-pointer">{faq.q}</summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ⚓ Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-auto border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} RevoShop. All rights reserved.</p>
        <p>Powered by Platzi Fake API</p>
      </footer>
    </div>
  );
}
