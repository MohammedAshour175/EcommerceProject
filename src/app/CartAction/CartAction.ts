/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { getUserToken } from "image/getUserToken"
import { CartData } from "image/types/cartData.type"

export async function getCartData() {
    const token: any = await getUserToken()
    if (!token) {
        throw new Error('TokenErorr')

    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
        headers: {
            token: token
        }
    }


    )
    const data: CartData = await res.json()
    return data
}
export async function AddProductToCart(id: string) {
    const token: any = await getUserToken()
    if (!token) {
        throw new Error('TokenErorr')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
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
export async function RemoveProductFromCart(id: string) {
    const token: any = await getUserToken()
    if (!token) {
        throw new Error('TokenErorr')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
        method: 'delete',
        headers: {
            token: token
        }
    })
    const data = await res.json()
    return data

}
export async function ClearCart() {
    const token: any = await getUserToken()
    if (!token) {
        throw new Error('TokenErorr')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
        method: 'delete',
        headers: {
            token: token
        }
    })
    const data = await res.json()
    return data
}
export async function UpdateProductQuantity(id: string, count: number) {
    const token: any = await getUserToken()
    if (!token) {
        throw new Error('TokenErorr')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
        method: 'put',
        body: JSON.stringify({
            count: count
        }),
        headers: {
            token: token,
            'content-type': 'application/json'

        }
    })
    const data = await res.json()
    return data
}