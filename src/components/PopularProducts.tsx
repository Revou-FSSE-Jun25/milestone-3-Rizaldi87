"use client";
import { useRef, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

export default function PopularProducts({ products }: { products: any[] }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative w-11/12 max-w-5xl mx-auto overflow-hidden">
      {/* Tombol kiri */}
      <button onClick={() => scroll("left")} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 hover:scale-105 transition z-10">
        ◀
      </button>

      {/* Container slider */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 px-4 pb-4
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.slice(0, 10).map((product) => (
          <div key={product.id} className="snap-center flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px]">
            <ProductCard {...product} />
          </div>
        ))}
      </div>

      {/* Tombol kanan */}
      <button onClick={() => scroll("right")} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 hover:scale-105 transition z-10">
        ▶
      </button>
    </div>
  );
}
