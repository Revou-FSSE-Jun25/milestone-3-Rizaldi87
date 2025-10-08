export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: Category | string;
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
  id: number;
  name: string;
  images: string;
  slug: string;
}
