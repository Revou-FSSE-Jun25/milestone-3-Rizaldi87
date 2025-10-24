"use client";

import Navbar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    const redirect = setTimeout(() => {
      router.push("/store");
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <Navbar />
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 max-w-md text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">Terima Kasih Telah Berbelanja!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Pesanan Anda sedang diproses. Kami akan segera mengirimkan detail pengiriman melalui email Anda.</p>

        <button onClick={() => router.push("/store")} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all">
          Kembali ke Toko
        </button>

        <p className="text-xs text-gray-400 mt-4">Anda akan dialihkan otomatis dalam 3 detik...</p>
      </div>
    </div>
  );
}
