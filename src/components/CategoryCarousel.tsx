"use client";
import { useRef, useEffect } from "react";
import CategoryCard from "@/components/CategoryCard";

export default function CategoryCarousel({ categories }: { categories: any[] }) {
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
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-4 pb-4 w-full
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => (
          <div key={category.id} className="snap-center shrink-0 w-64 sm:w-72 md:w-80">
            <CategoryCard id={category.id} name={category.name} image={category.image} />
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
