'use client'
import { AddProductToCart } from 'image/app/CartAction/CartAction'
import { Button } from 'image/components/ui/button'
import React from 'react'
import { toast } from 'sonner'
import { useContext } from 'react';
import { CountContext } from 'image/CountProvider'

export default function AddCartBtn({ id }: { id: string }) {
    const countData = useContext(CountContext)

    async function addProduct(id: string) {
        try {
            const data = await AddProductToCart(id)
            if (data.status = 'success') {
                toast.success(data.message, { position: 'top-center' })
                const sum = data.data.products.reduce((total: number, item: { count: number }) => total += item.count, 0)
                countData?.setCount(sum)
            } else {
                toast.error('incorrect Id', { position: 'top-center' })

            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error('cant add product to the cart without login', { position: 'top-center' })
        }
    }

    return (
        <Button onClick={() => { addProduct(id) }} className='bg-main w-full rounded-3xl cursor-pointer'>Add to cart</Button>
    )
}
