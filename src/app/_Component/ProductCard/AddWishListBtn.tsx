'use client'
import { AddProductToWishList } from 'image/app/WishlistAction/WishlistAction';
import React from 'react'
import { toast } from 'sonner';

export default function AddWishListBtn({ id }: { id: string }) {
    async function AddProductWishList(id: string) {


        try {
            const data = await AddProductToWishList(id)
            if (data.status == "success") {
                toast.success(data.message, { position: 'top-center' })

            } else {
                toast.error('incorrect Id', { position: 'top-center' })

            }
        } catch (err) {
            toast.error('cant add product to the wishlist without login', { position: 'top-center' })
        }


    }
    return (
        <button onClick={() => AddProductWishList(id)} className="absolute top-3 right-3 text-red-500 hover:scale-110 transition cursor-pointer">
            <i className="fa-solid fa-heart"></i>
        </button>
    )
}
