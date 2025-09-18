"use client"
import { product, ProductData } from "image/types/product.type";
import ProuductCard from "./_Component/ProductCard/ProuductCard";
import MainSlider from "./_Component/MainSlider/MainSlider";
import MiddileSlider from "./_Component/MiddileSlider/MiddileSlider";
import { Suspense, useEffect, useState } from "react";
import { HomeLoading } from "./_Component/HomeLoading/HomeLoading";

export default function Home() {
  const [products, setProducts] = useState<product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`, { cache: 'force-cache' });
      const data: ProductData = await res.json();
      setProducts(data.data);
    }
    fetchProducts();
  }, []);

  // ✅ الفلترة حسب الاسم والكاتيجوري
  const filteredProducts = products.filter((p) => {
    const matchName = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category ? p.category.name === category : true;
    return matchName && matchCategory;
  });

  return (
    <>
      <title>Home</title>
      <MainSlider />
      <MiddileSlider />

      <h1 className="text-center bg-gray-400 rounded-2xl py-2 mt-6">Home</h1>

      <div className="flex gap-4 my-4 justify-center items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg w-1/2"
        />

      </div>

      <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 py-3">
        <Suspense fallback={<HomeLoading />}>
          {filteredProducts.map((product) => (
            <ProuductCard key={product._id} product={product} />
          ))}
        </Suspense>
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No products found</p>
      )}
    </>
  );
}
