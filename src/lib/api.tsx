import { Product, ProductFormData } from "@/app/types/product";
import axios from "axios";
import { getCookie } from "./auth";

const DUMMYJSON_API_BASE = "https://api.escuelajs.co/api/v1";

// TODO 3: Implement getProducts function to fetch all products
// Use axios to fetch from DummyJSON and return ProductsResponse
// export async function getProducts(): Promise<ProductsResponse> {
//   try {
//     const response = await axios.get(`${DUMMYJSON_API_BASE}/products?limit=10`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw new Error('Failed to fetch products');
//   }
// }

export async function getProducts() {
  try {
    const res = await fetch(`${DUMMYJSON_API_BASE}/products`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Gagal mengambil data produk");
    return res.json();
  } catch (error) {
    console.error("❌ Gagal mengambil data produk:", error);
    return null;
  }
}

// TODO 4: Implement getProduct function to fetch single product
// Use axios to fetch one product by ID from DummyJSON
export async function getProduct(id: number): Promise<Product> {
  try {
    const response = await axios.get(`${DUMMYJSON_API_BASE}/products/${id}`);
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

    const response = await axios.post(`${DUMMYJSON_API_BASE}/products/`, productData);
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

    const response = await axios.put(`${DUMMYJSON_API_BASE}/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(id: number): Promise<void> {
  try {
    await axios.delete(`${DUMMYJSON_API_BASE}/products/${id}`);
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
  const res = await fetch(`${DUMMYJSON_API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      expiresInMins: 30,
    }),
  });

  if (!res.ok) {
    throw new Error("Gagal login");
  }

  return res.json();
};

export const getCurrentUser = async () => {
  const token = getCookie("access_token");

  const res = await fetch(`${DUMMYJSON_API_BASE}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Login gagal:", res.status, errText);
    throw new Error("Gagal login");
  }

  return res.json();
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
