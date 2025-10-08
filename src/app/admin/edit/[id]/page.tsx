"use client";
import Navbar from "@/components/NavBar";
import ProductForm from "@/components/ProductForm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import { getProduct } from "@/lib/api";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const productData = await getProduct(Number(productId));
      setProduct(productData);
    } catch (err) {
      setError("Failed to fetch product details.");
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleProductUpdate = async (updatedProduct: Product) => {
    alert(`Product "${updatedProduct.title}" updated successfully!`);
    router.push(`/admin/`);
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to discard your changes?")) {
      router.push(`/admin/`);
    }
  };

  const isValidId = /^\d+$/.test(productId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !isValidId || !product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">{!isValidId ? "Invalid Product ID" : "Product Not Found"}</h1>
          <p className="text-gray-400 mb-8">{!isValidId ? "The product ID is not valid." : error || "The product doesn't exist."}</p>
          <a href="/products" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md transition-colors inline-block">
            Back to Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="mt-12 flex-1 px-6 py-12">
        <ProductForm product={product} onSuccess={handleProductUpdate} onCancel={handleCancel} />
      </div>
    </div>
  );
}
