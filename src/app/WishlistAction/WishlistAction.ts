/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { getUserToken } from "image/getUserToken"
import { WishListData } from "image/types/wishListData.type"

export async function GetWishlistData() {
    const token: any = await getUserToken()
    if (!token) {
        throw new Error('TokenErorr')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        headers: {
            token: token
        }
    })
    const data: WishListData = await res.json()
    return data

}
export async function RemoveProductWishList(id: string) {
    const token: any = await getUserToken()
    if (!token) {
        throw new Error('TokenErorr')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`, {
        method: 'delete',
        headers: {
            token: token
        }
    })
    const data = await res.json()
    return data

}
export async function AddProductToWishList(id: string) {
    const token: any = await getUserToken()
    if (!token) {
        throw new Error('TokenErorr')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        method: 'post',
        body: JSON.stringify({
            productId: id
        }),
        headers: {
            token: token,
            'content-type': 'application/json'
        }
    })
    const data = await res.json()
    return data

}