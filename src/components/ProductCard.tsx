"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/app/types/product";
import Image from "next/image";

export default function ProductCard({ id, title, images, price, category }: Product) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/store/${id}`);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300 overflow-hidden group flex flex-col"
    >
      {/* 🖼️ Product Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={images?.[0] || "/no-image.png"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          placeholder="blur"
          blurDataURL="/blur-placeholder.png"
          unoptimized // bisa bikin gambar blur 1x1px
        />
      </div>

      {/* 🧾 Product Info */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h2 className="font-semibold text-lg mb-1 line-clamp-2">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-3">{typeof category === "object" ? category?.name : category || "Uncategorized"}</p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">${price}</span>
          <button onClick={handleNavigate} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-all">
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}
