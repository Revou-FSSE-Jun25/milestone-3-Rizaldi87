async function getData() {
  try {
    const res = await fetch("https://dummyjson.com/products/1");
    const data = res.json();

    return data;
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
  }
}

export default async function SSR() {
  const product = await getData();

  console.log("product", product);

  return <h1>ini ssr </h1>;
}
