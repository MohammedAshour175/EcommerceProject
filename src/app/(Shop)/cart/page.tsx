'use client';
import {
    ClearCart,
    getCartData,
    RemoveProductFromCart,
    UpdateProductQuantity,
} from 'image/app/CartAction/CartAction';
import { Button } from 'image/components/ui/button';
import { CountContext } from 'image/CountProvider';
import { cart, CartData } from 'image/types/cartData.type';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function CartPage() {
    const countData = useContext(CountContext);

    const [currentId, setCurrentId] = useState<string>();
    const [cartLoading, setCartLoading] = useState(true);
    const [countLoading, setCountLoading] = useState(false);
    const [countDisabled, setCountDisabled] = useState(false);

    const [cart, setCart] = useState<cart | null>(null);

    useEffect(() => {
        getAllCartData();
    }, []);

    async function getAllCartData() {
        setCartLoading(true);
        const data: CartData = await getCartData();
        setCart(data.data);
        setCartLoading(false);
    }

    async function deleteProduct(id: string) {
        const data = await RemoveProductFromCart(id);
        if (data.status === 'success') {
            toast.success('Product Deleted', { position: 'top-center' });
            setCart(data.data);

            const sum = data.data.products.reduce(
                (total: number, item: { count: number }) => (total += item.count),
                0
            );
            countData?.setCount(sum);
        }
    }

    async function clearCart() {
        const data = await ClearCart();
        if (data.message === 'success') {
            setCart(null);
            countData?.setCount(0);
        }
    }

    async function UpdateProductCount(id: string, count: number) {
        setCountDisabled(true);
        setCurrentId(id);
        setCountLoading(true);

        const data = await UpdateProductQuantity(id, count);
        if (data.status === 'success') {
            setCart(data.data);

            const sum = data.data.products.reduce(
                (total: number, item: { count: number }) => (total += item.count),
                0
            );
            countData?.setCount(sum);
        }

        setCountLoading(false);
        setCountDisabled(false);
    }

    return (
        <div>
            <title>Cart</title>
            <h1 className="text-4xl font-bold text-center">Shop Cart</h1>
            {cartLoading ? (
                <h1 className="text-5xl font-extrabold">Loading.........</h1>
            ) : (
                <>
                    {cart && cart.totalCartPrice !== 0 ? (
                        <>
                            <h2 className="text-2xl text-main font-bold">
                                Total Price {cart.totalCartPrice}
                            </h2>
                            <Button
                                onClick={() => clearCart()}
                                className="bg-red-800 p-5 rounded-3xl float-right m-2"
                            >
                                Clear Cart
                            </Button>
                            <div className="clear-both"></div>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-16 py-3">
                                                <span className="sr-only">Image</span>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Product
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Qty
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart?.products.map((item) => (
                                            <tr
                                                key={item._id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            >
                                                <td className="p-4">
                                                    <Image
                                                        src={item.product.imageCover}
                                                        width={100}
                                                        height={100}
                                                        className="w-16 md:w-32 max-w-full max-h-full"
                                                        alt={item.product.title}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {item.product.title}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <Button
                                                            disabled={countDisabled}
                                                            onClick={() =>
                                                                UpdateProductCount(item.product._id, item.count - 1)
                                                            }
                                                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer"
                                                            type="button"
                                                        >
                                                            <span className="sr-only">Quantity button</span>
                                                            {item.count === 1 ? (
                                                                <i className="fa-solid fa-trash text-red-600"></i>
                                                            ) : (
                                                                <svg
                                                                    className="w-3 h-3"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 18 2"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M1 1h16"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </Button>
                                                        <div>
                                                            {countLoading && currentId === item.product._id ? (
                                                                <i className="fa-solid fa-spinner fa-spin"></i>
                                                            ) : (
                                                                <span>{item.count}</span>
                                                            )}
                                                        </div>
                                                        <Button
                                                            disabled={countDisabled}
                                                            onClick={() =>
                                                                UpdateProductCount(item.product._id, item.count + 1)
                                                            }
                                                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer"
                                                            type="button"
                                                        >
                                                            <span className="sr-only">Quantity button</span>
                                                            <svg
                                                                className="w-3 h-3"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 18 18"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M9 1v16M1 9h16"
                                                                />
                                                            </svg>
                                                        </Button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {item.price}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Button
                                                        disabled={countDisabled}
                                                        onClick={() => deleteProduct(item.product._id)}
                                                        className="bg-red-700"
                                                    >
                                                        <i className="fa-solid fa-trash cursor-pointer"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <br />
                            <Button className="bg-main w-full p-5 text-center rounded-3xl ">
                                <Link href={'/checkoutSession/' + cart._id} className="text-white">
                                    Checkout Session with visa
                                </Link>
                            </Button>
                            <br /><br />
                            <Button className="bg-main w-full p-5 text-center rounded-3xl ">
                                <Link href={'/cashPayment/' + cart._id} className="text-white">
                                    Checkout with cash
                                </Link>
                            </Button>
                        </>
                    ) : (
                        <div
                            className="p-4 my-3 mb-4 justify-center items-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            <span className="text-center">Cart Empty</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
