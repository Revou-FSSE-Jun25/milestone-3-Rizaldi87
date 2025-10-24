"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  title: string;
};

export default function ProductImages({ images, title }: Props) {
  const [currentImage, setCurrentImage] = useState(images?.[0] || "/no-image.png");

  return (
    <div className="w-full">
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-lg group">
        <Image src={currentImage} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
      </div>

      {images?.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.slice(0, 4).map((img, idx) => (
            <div key={idx} onClick={() => setCurrentImage(img)} className={`relative w-20 h-20 rounded-xl overflow-hidden border cursor-pointer ${currentImage === img ? "ring-2 ring-indigo-500" : ""}`}>
              <Image src={img || "/no-image.png"} alt={`${title} ${idx}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
