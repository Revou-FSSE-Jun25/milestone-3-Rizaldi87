"use client";

import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Product, ProductFormData, Category } from "@/app/types/product";
import { createProduct, updateProduct } from "@/lib/api";
import Loading from "@/app/loading";

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

  if (loading) return <Loading />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="title" className="block mb-1 font-medium">
          Title
        </label>
        <input
          id="title"
          {...register("title", {
            required: "Title required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
          className="w-full border p-2 rounded-md"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block mb-1 font-medium">
          Price
        </label>
        <input
          id="price"
          type="number"
          {...register("price", {
            required: "price required",
            min: {
              value: 1,
              message: "Price must be at least $ 1.00",
            },
          })}
          className="w-full border p-2 rounded-md"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-medium">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", {
            required: "Description required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
          className="w-full border p-2 rounded-md"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="categoryId" className="block mb-1 font-medium">
          Category
        </label>
        <select
          id="categoryId"
          {...register("categoryId", {
            required: true,
            valueAsNumber: true,
          })}
          className="w-full border p-2 rounded-md"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
      </div>

      <div>
        <label htmlFor="images" className="block mb-1 font-medium">
          Images (comma separated URLs)
        </label>
        <input
          id="images"
          {...register("images", {
            required: "at least one image URL required",
            // validate: (value) => {
            //   const urls = value.split(",");
            //   const regex = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
            //   return urls.every((url) => regex.test(url.trim())) || "Image URLs are invalid";
            // },
          })}
          className="w-full border p-2 rounded-md"
          placeholder="https://picsum.photos/id/237/200/300, https://example.com/img2.jpg"
        />
        {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
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
