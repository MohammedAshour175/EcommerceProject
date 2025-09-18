"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState } from "react";
import Image from "next/image";

export default function SubCategories({ categories }: { categories: any[] }) {
    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    async function handleClick(cat: any) {
        setSelectedCategory(cat.name);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${cat._id}/subcategories`,
                {
                    headers: {
                        token: localStorage.getItem("token") || "",
                    },
                    cache: "no-store",
                }
            );

            if (!res.ok) throw new Error("Failed to fetch subcategories");

            const data = await res.json();
            setSubCategories(data.data);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            setSubCategories([]);
        }
    }

    return (
        <>
            <div className="flex flex-wrap py-5">
                {categories.map((cat) => (
                    <div
                        key={cat._id}
                        onClick={() => handleClick(cat)}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 cursor-pointer hover:shadow-lg transition rounded-lg"
                    >
                        <Image
                            src={cat.image}
                            alt={cat.name}
                            width={300}
                            height={200}
                            className="w-full h-52 object-cover rounded-2xl"
                        />
                        <h2 className="mt-2 text-center text-lg font-semibold">
                            {cat.name}
                        </h2>
                    </div>
                ))}
            </div>

            {/* ✅ عرض الساب كاتيجوريز */}
            {subCategories.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-green-600 text-center font-bold text-xl mb-4">
                        {selectedCategory} Subcategories
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {subCategories.map((sub) => (
                            <div
                                key={sub._id}
                                className="border rounded p-3 text-center cursor-pointer hover:bg-gray-100"
                            >
                                {sub.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
