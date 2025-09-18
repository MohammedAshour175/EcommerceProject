import ProductDetailsCard from 'image/app/_Component/ProductDetailsCard/ProductDetailsCard'
import { Data, ProductDetails } from 'image/types/productDetails.type'
import React from 'react'


export default async function page({ params }: { params: { id: string } }) {
    const { id } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`)
    const data: ProductDetails = await res.json()
    const product: Data = data.data

    return (
        <div>
            <title>{product.title}</title>
            <ProductDetailsCard product={product} />
        </div>
    )
}
