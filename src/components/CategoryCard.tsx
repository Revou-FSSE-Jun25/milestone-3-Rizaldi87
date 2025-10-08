"use client";
import { useRouter } from "next/navigation";
import { Category } from "@/app/types/product";

export default function CategoryCard({ id, name, images, slug = "" }: Category) {
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/store/?categoryId=${id}`);
  };

  return (
    <div className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h1 className="absolute top-2 left-2 text-2xl font-semibold text-gray-900 dark:text-white"> {name} </h1>
      <img className="object-cover w-full rounded-lg h-64 sm:h-80 md:h-96" src={images} alt="product image" />

      <button className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300" onClick={handleNavigate}>
        Go To Store
      </button>
    </div>
  );
}
