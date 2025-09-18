'use client'
import { GetWishlistData, RemoveProductWishList } from 'image/app/WishlistAction/WishlistAction'
import { Button } from 'image/components/ui/button'
import { Datum, WishListData } from 'image/types/wishListData.type'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

// ممكن تعرف تايب للـ response بتاع RemoveProductWishList لو مش موجود
interface RemoveResponse {
    status: string
    message: string
}

export default function Wishlist() {
    const [wishList, setWishList] = useState<Datum[]>([])
    const [wishListLoading, setWishListLoading] = useState<boolean>(false)

    async function GetAllWishListData() {
        setWishListLoading(true)
        const data: WishListData = await GetWishlistData()
        setWishListLoading(false)
        setWishList(data.data)
    }

    async function RemoveProductFromWishList(id: string) {
        const data: RemoveResponse = await RemoveProductWishList(id)
        if (data.status === 'success') {
            toast.success(data.message, { position: 'top-center' })
            GetAllWishListData()
        }
    }

    useEffect(() => {
        GetAllWishListData()
    }, [])

    return (
        <div>
            <title>WishList</title>
            <h1 className="text-4xl font-bold text-center">WishList Page</h1>

            {wishListLoading ? (
                <h1 className="text-5xl font-extrabold">Loading.........</h1>
            ) : (
                <>
                    {wishList.length === 0 ? (
                        <div
                            className="p-4 my-3 mb-4 justify-center items-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            <span className="text-center">WishList Empty</span>
                        </div>
                    ) : (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-16 py-3">
                                            <span>Image</span>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Product
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-16 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishList.map((item) => (
                                        <tr
                                            key={item._id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <td className="p-4">
                                                <Image
                                                    src={item.imageCover}
                                                    width={100}
                                                    height={100}
                                                    className="w-16 md:w-32 max-w-full max-h-full object-cover"
                                                    alt={item.title}
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {item.title}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {item.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Button
                                                    onClick={() => RemoveProductFromWishList(item._id)}
                                                    className="bg-red-700"
                                                >
                                                    <i className="fa-solid fa-trash cursor-pointer"></i>
                                                    Remove From WishList
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
