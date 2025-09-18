import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { product } from 'image/types/product.type';
import Link from 'next/link';
import AddCartBtn from './AddCartBtn';
import { Button } from 'image/components/ui/button';
import { AddProductToWishList } from 'image/app/WishlistAction/WishlistAction';
import AddWishListBtn from './AddWishListBtn';

export default function ProuductCard({ product }: { product: product }) {
    const { imageCover, title, ratingsAverage, price, category: { name }, _id } = product

    return (
        <Card className="bg-gray-300 relative">
            <AddWishListBtn id={_id} />


            <Link href={"/products/" + _id}>
                <CardHeader className="relative">
                    <Image
                        src={imageCover}
                        alt={title}
                        width={200}
                        height={100}
                        className="w-full object-cover rounded-2xl"
                    />
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-main">{name}</CardTitle>
                    <CardTitle>{title.split(" ").slice(0, 2).join(" ")}</CardTitle>
                    <div className="flex justify-between items-center">
                        <span>{price}EGP</span>
                        <span>
                            <i className="fa-solid fa-star rating-color">{ratingsAverage}</i>
                        </span>
                    </div>
                </CardContent>
            </Link>
            <CardFooter>
                <AddCartBtn id={_id} />
            </CardFooter>
        </Card>

    )
}
