/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { getUserToken } from "image/getUserToken"

export async function GetallBrandData() {
    const token: any = await getUserToken()
    if (!token) {
        throw new Error('TokenErorr')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`, {
        headers: {
            token: token
        }
    }
    )
    const data = await res.json()
    return data

}