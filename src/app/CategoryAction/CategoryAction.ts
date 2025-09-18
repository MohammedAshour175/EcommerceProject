/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { getUserToken } from "image/getUserToken"
import { CategoryData } from "image/types/CategoryData.type"

export async function GetCategoryData() {
    // const token: any = await getUserToken()
    // if (!token) {
    //     console.error("No token found. User might not be logged in.")
    // }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`, {
        // headers: {
        //     token: token
        // }
    })
    const data: CategoryData = await res.json()
    return data
}
