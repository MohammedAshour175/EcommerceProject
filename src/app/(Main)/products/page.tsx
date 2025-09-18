"use client"
import { useEffect, useState } from "react"
import { product, ProductData } from "image/types/product.type"
import { Suspense } from "react"
import { HomeLoading } from "image/app/_Component/HomeLoading/HomeLoading"
import ProuductCard from "image/app/_Component/ProductCard/ProuductCard"

export default function ProductsPage() {
    const [products, setProducts] = useState<product[]>([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`, { cache: 'force-cache' })
            const data: ProductData = await res.json()
            setProducts(data.data)
        }
        fetchProducts()
    }, [])

    // ✅ فلترة المنتجات حسب الاسم
    const filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    )

    return (

        <div className="p-6">
            <title>Products</title>
            <h1 className="text-center text-2xl font-bold mb-4">All Products</h1>

            {/* 🔍 Input Search */}
            <div className="flex gap-4 my-4 justify-center items-center">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-3 py-2 rounded-lg w-1/2"
                />
            </div>

            {/* 🛒 عرض المنتجات */}
            <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 py-3">
                <Suspense fallback={<HomeLoading />}>
                    {filteredProducts.map((product) => (
                        <ProuductCard key={product._id} product={product} />
                    ))}
                </Suspense>
            </div>

            {/* ❌ لو مفيش منتجات */}
            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-6">No products found</p>
            )}
        </div>
    )
}
