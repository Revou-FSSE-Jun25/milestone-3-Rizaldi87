"use client";

import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Product, ProductFormData, Category } from "@/app/types/product";
import { createProduct, updateProduct } from "@/lib/api";

interface ProductFormProps {
  product?: Product;
  onSuccess?: (product: Product) => void;
  onCancel?: () => void;
}

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      title: product?.title || "",
      price: product?.price || 0,
      description: product?.description || "",
      categoryId: typeof product?.category === "object" && product?.category !== null ? product?.category.id : product?.category ?? 0,
      images: product?.images?.join(",") || "",
    },
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true);
      setError(null);

      const productData = {
        title: data.title,
        price: Number(data.price), // pastikan number
        description: data.description,
        categoryId: Number(data.categoryId), // pastikan number
        images: data.images,
      };

      let result: Product;
      if (product) {
        result = await updateProduct(product.id, productData);
        setSuccessMessage("Product updated successfully!");
      } else {
        result = await createProduct(productData);
        setSuccessMessage("Product created successfully!");
        reset();
      }

      onSuccess?.(result);
    } catch (err) {
      setError(product ? "Failed to update product. Please try again." : "Failed to create product. Please try again.");
      console.error("Error saving product:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        if (!res.ok) throw new Error("Gagal mengambil data kategori");
        const data: Category[] = await res.json();
        setCategories(data);

        // reset form agar categoryId otomatis terseleksi
        if (product) {
          const categoryId = typeof product.category === "object" && "id" in product.category ? product.category.id : product.category;
          reset({
            title: product.title,
            price: product.price,
            description: product.description,
            categoryId: categoryId,
            images: product.images.join(","),
          });
        }
      } catch (err) {
        console.error("❌ Gagal mengambil data kategori:", err);
        setError("Gagal mengambil data kategori");
      }
    })();
  }, [product, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="title" className="block mb-1 font-medium">
          Title
        </label>
        <input id="title" {...register("title", { required: "Title required" })} className="w-full border p-2 rounded-md" />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block mb-1 font-medium">
          Price
        </label>
        <input id="price" type="number" {...register("price", { required: true, min: 0 })} className="w-full border p-2 rounded-md" />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-medium">
          Description
        </label>
        <textarea id="description" {...register("description")} className="w-full border p-2 rounded-md" />
      </div>

      <div>
        <label htmlFor="categoryId" className="block mb-1 font-medium">
          Category
        </label>
        <select id="categoryId" {...register("categoryId", { required: true })} className="w-full border p-2 rounded-md">
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="images" className="block mb-1 font-medium">
          Images (comma separated URLs)
        </label>
        <input id="images" {...register("images")} className="w-full border p-2 rounded-md" placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
      </div>

      <div className="flex gap-4">
        <button type="submit" disabled={isSubmitting || loading} className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
          {product ? "Update Product" : "Add Product"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
