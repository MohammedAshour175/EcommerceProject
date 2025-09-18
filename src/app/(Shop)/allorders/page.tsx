'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

interface Order {
    _id: string
    shippingAddress: {
        details: string
        phone: string
        city: string
    }
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    user: {
        _id: string
        name: string
        email: string
        phone: string
    }
    cartItems: {
        _id: string
        count: number
        price: number
        product: {
            _id: string
            title: string
            imageCover: string
        }
    }[]
}

export default function OrdersTable() {
    const [orders, setOrders] = useState<Order[]>([])
    const { data: session } = useSession()


    useEffect(() => {
        async function fetchOrders() {
            if (!session?.id) return // استنى لما السيشن يبقى جاهز
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${session.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.token}`, // لو محتاج توكن
                        },
                    }
                )
                const data = await res.json()
                setOrders(data)
            } catch (err) {
                console.error('Error fetching orders:', err)
            }
        }

        fetchOrders()
    }, [session?.id, session?.token])

    return (
        <div className="p-6">
            <title>Orders</title>
            <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>

            <div className="overflow-x-auto shadow-lg rounded-2xl">
                <table className="min-w-full text-sm text-left text-gray-500">
                    <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Products</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Payment</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order._id}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {order._id.slice(-6)}
                                </td>

                                <td className="px-6 py-4">
                                    <p className="font-semibold">{order.user.name}</p>
                                    <p className="text-xs text-gray-400">{order.user.email}</p>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-2">
                                        {order.cartItems.map((item) => (
                                            <div
                                                key={item._id}
                                                className="flex items-center gap-2"
                                            >
                                                <Image
                                                    src={item.product.imageCover}
                                                    alt={item.product.title}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-lg object-cover"
                                                />
                                                <span>
                                                    {item.product.title} × {item.count}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </td>

                                <td className="px-6 py-4 font-bold text-main">
                                    {order.totalOrderPrice} EGP
                                </td>

                                <td className="px-6 py-4 capitalize">
                                    {order.paymentMethodType}
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 mt-1 inline-block rounded-full text-xs font-semibold ${order.isPaid
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {order.isPaid ? 'Paid' : 'Unpaid'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {orders.length === 0 && (
                <p className="text-center text-gray-500 mt-6">No orders found</p>
            )}
        </div>
    )
}
