import Home from "@/app/Home";

export const metadata = {
  title: "RevoShop - Best Products",
  description: "Discover products easily, quickly, and affordably.",
  keywords: ["ecommerce", "shop", "revoshop", "products"],
  openGraph: {
    title: "RevoShop - Best Products",
    description: "Shop everything you love in one place.",
    url: "https://revoshop.com",
    siteName: "RevoShop",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <Home />;
}
