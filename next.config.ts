import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 🔐 Izinkan hanya domain terpercaya (sudah kamu isi dengan baik)
    domains: ["i.imgur.com", "api.escuelajs.co", "placeimg.com", "picsum.photos", "houseofsmith.co.id", "encrypted-tbn0.gstatic.com"],

    // ⚡ Aktifkan image optimization di server Next.js
    formats: ["image/avif", "image/webp"],

    // 🧩 Konfigurasi ukuran gambar yang di-generate (opsional tapi efisien)
    deviceSizes: [320, 480, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],

    // 💾 Cache image agar tidak di-fetch ulang tiap kali (Next akan otomatis caching di .next/cache)
    minimumCacheTTL: 60 * 60 * 24, // 1 hari
  },
  reactStrictMode: true,
};

export default nextConfig;
