'use client'
import { createContext, useEffect, useState } from "react";
import { getUserToken } from "./getUserToken";
import { getCartData } from "./app/CartAction/CartAction";
import { CartData } from "./types/cartData.type";

interface CountContextType {
    count: number
    setCount: React.Dispatch<React.SetStateAction<number>>
}

export const CountContext = createContext<CountContextType | null>(null)

export default function CountProvider({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState<number>(0)

    async function getCart() {
        const token: unknown = await getUserToken()
        if (token) {
            const data: CartData = await getCartData()
            const sum = data.data.products.reduce((total, item) => total + item.count, 0)
            setCount(sum)
        }
    }

    useEffect(() => {
        getCart()
    }, [])

    return (
        <CountContext.Provider value={{ count, setCount }}>
            {children}
        </CountContext.Provider>
    )
}
