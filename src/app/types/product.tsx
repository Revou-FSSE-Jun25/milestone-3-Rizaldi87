export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: Category | string | number;
  thumbnail: string;
  images: string[];
  quantity: number;
}

export interface ProductCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
  category: any;
}
export interface Category {
  id: number | string;
  name: string;
  images: string;
  slug: string;
}

export interface ProductFormData {
  title: string;
  price: number | string;
  description: string;
  categoryId: number | string;
  images: string;
}
