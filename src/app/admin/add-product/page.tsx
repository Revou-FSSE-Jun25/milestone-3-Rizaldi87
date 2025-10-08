"use client";

import { Product, ProductFormData } from "@/app/types/product";
import Navbar from "@/components/NavBar";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/navigation";

function CreateProductPage() {
  const router = useRouter();

  const handleProductCreate = async (product: Product) => {
    alert("Product created successfully!");
    router.push("/admin");
  };
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to discard your changes?")) {
      router.push("/admin/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="mt-12 flex-1 px-6 py-12">
        <ProductForm onSuccess={handleProductCreate} onCancel={handleCancel} />
      </div>
    </div>
  );
}

export default CreateProductPage;
