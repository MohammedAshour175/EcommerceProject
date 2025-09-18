/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { getUserToken } from "image/getUserToken"

export async function checkoutPayment(cartId: string, shippingData: { details: string, phone: string, city: string }) {
    const token: any = await getUserToken()
    if (!token) {
        throw new Error('TokenErorr')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_URL}`, {
        method: 'post',
        body: JSON.stringify({
            "shippingAddress": shippingData
        }),
        headers: {
            token: token,
            'content-type': 'application/json'
        }
    })
    const data = await res.json()
    return data
}
export async function CashPayment(cartId: string, shippingData: { details: string, phone: string, city: string }) {
    const token: any = await getUserToken()
    if (!token) {
        throw new Error('TokenErorr')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cartId}`, {
        method: 'post',
        body: JSON.stringify({
            "shippingAddress": shippingData
        }),
        headers: {
            token: token,
            'content-type': 'application/json'
        }
    })
    const data = await res.json()
    return data
}
