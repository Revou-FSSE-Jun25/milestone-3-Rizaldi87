"use client";

import { useRouter } from "next/navigation";

type ProductCardProps = {
  id: number;
  title: string;
  image: string;
  price: number;
};

export default function ProductCard({ id, title, image, price }: ProductCardProps) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Gambar produk */}
      <img className="object-cover w-full h-64 sm:h-72 md:h-80 rounded-t-2xl" src={image} alt={title} />

      {/* Info produk */}
      <div className="flex flex-col gap-2 px-4 py-3">
        <h1 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">{title}</h1>

        <div className="flex justify-between items-center">
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg">${price}</span>

          <button className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-indigo-700 transition duration-300" onClick={handleNavigate}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
