import { Product, ProductFormData } from "@/app/types/product";
import axios from "axios";
import { getCookie } from "./auth";

axios.defaults.withCredentials = true;

export async function getProducts() {
  try {
    const res = await axios.get(`/api/products`);
    return res.data;
  } catch (error) {
    console.error("❌ Gagal mengambil data produk:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    const res = await axios.get(`/api/categories`);
    return res.data;
  } catch (error) {
    console.error("❌ Gagal mengambil data kategori:", error);
    return null;
  }
}

// TODO 4: Implement getProduct function to fetch single product
// Use axios to fetch one product by ID from DummyJSON
export async function getProduct(id: string): Promise<Product> {
  if (!id) {
    throw new Error(" ID produk tidak valid");
  }
  try {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
}

// TODO 5: Implement createProduct function to add new product
// Use axios to POST new product data to DummyJSON
export async function createProduct(data: ProductFormData): Promise<Product> {
  try {
    const productData = {
      title: data.title,
      price: Number(data.price), // pastikan number
      description: data.description,
      categoryId: Number(data.categoryId), // pastikan number

      images: data.images
        ? data.images
            .split(",")
            .map((img) => img.trim())
            .filter(Boolean)
        : [],
    };

    const response = await axios.post(`/api/products/`, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
}

// Additional CRUD functions for complete functionality
export async function updateProduct(id: number, data: Partial<ProductFormData>): Promise<Product> {
  try {
    const productData = {
      title: data.title,
      price: Number(data.price), // pastikan number
      description: data.description,
      categoryId: Number(data.categoryId), // pastikan number

      images: data.images
        ? data.images
            .split(",")
            .map((img) => img.trim())
            .filter(Boolean)
        : undefined,
    };

    const response = await axios.put(`/api/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(id: number): Promise<void> {
  try {
    await axios.delete(`/api/products/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}

//Data user admin
//{
//   "id": 4,
//   "email": "john@mail.com",
//   "password": "1234",
//   "name": "Change name",
//   "role": "admin",
//   "avatar": "https://i.imgur.com/yhW6Yw1.jpg"
// }

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post("/api/auth/login", { email, password });
    return res.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get("/api/auth/profile");

    return res.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

// export async function searchProducts(query: string): Promise<ProductsResponse> {
//   try {
//     const response = await axios.get(`${DUMMYJSON_API_BASE}/products/search?q=${encodeURIComponent(query)}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error searching products:", error);
//     throw new Error("Failed to search products");
//   }
// }
