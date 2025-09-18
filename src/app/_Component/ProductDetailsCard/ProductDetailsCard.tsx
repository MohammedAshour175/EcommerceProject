import { Button } from 'image/components/ui/button'
import { Data } from 'image/types/productDetails.type'
// import Image from 'next/image'
import React from 'react'
import ProductSlider from '../ProductSlider/ProductSlider'
import AddCartBtn from '../ProductCard/AddCartBtn'
import AddWishListBtn from './AddProductWishListBtn'

export default function ProductDetailsCard({ product }: { product: Data }) {
    const { title, ratingsAverage, price, category: { name }, description, images, _id } = product
    return (
        <div className='w-4/5 m-auto '>
            <div className='grid grid-cols-12 gap-24 items-center'>
                <div className='col-span-3'>
                    {/* <Image src={imageCover} alt={title} width={200} height={100} className='w-full object-cover rounded-2xl' /> */}
                    <ProductSlider images={images} />
                </div>
                <div className='col-span-9'>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <h5 className='text-main my-4'>{name}</h5>
                    <div className='flex justify-between items-center'>
                        <span>{price}EGP</span>
                        <span> <i className='fa-solid fa-star rating-color'>{ratingsAverage}</i></span>
                    </div>
                    <div className='flex'>                    <AddCartBtn id={_id} />
                        <AddWishListBtn id={_id} /></div>


                </div>
            </div>

        </div>
    )
}
