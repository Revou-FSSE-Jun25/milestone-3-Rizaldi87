"use client";
import { useState, useEffect } from "react";

type ImageSliderProps = {
  images: string[];
  interval?: number; // jeda antar slide (ms)
};

export default function ImageSlider({ images, interval = 3000 }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);

  // Ganti slide otomatis
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Fungsi navigasi manual
  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg">
      {/* Gambar */}
      <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Slide ${index + 1}`} className="w-full flex-shrink-0 object-cover h-64 sm:h-80 md:h-96" />
        ))}
      </div>

      {/* Tombol navigasi */}
      <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition">
        ‹
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition">
        ›
      </button>

      {/* Indikator (dot) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button key={index} onClick={() => setCurrent(index)} className={`h-2 w-2 rounded-full ${current === index ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-600"}`} />
        ))}
      </div>
    </div>
  );
}
