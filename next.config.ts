import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "i.imgur.com", // untuk gambar dari imgur
      "api.escuelajs.co", // karena API produk dari escuelajs juga pakai image domain ini
      "placeimg.com", // beberapa produk dummy pakai domain ini juga
      "picsum.photos", // tambahan opsional jika kamu pakai dummy image
    ],
  },
};

export default nextConfig;
