"use client"
import { GetCategoryData } from "image/app/CategoryAction/CategoryAction";
import { CategoryData, CategoryDeta } from "image/types/CategoryData.type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function MiddileSlider() {
    useEffect(() => { getAllCategortData() }, [])
    const [CategoryData, setCategoryData] = useState<CategoryDeta[]>([])
    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };
    async function getAllCategortData() {
        const data: CategoryData = await GetCategoryData()
        setCategoryData(data.data)


    }
    return (
        <div className="grid grid-cols-12 m-4">
            <div className="col-span-12">
                <div className="slider-container pb-3 h-65">
                    <Slider {...settings}>
                        {
                            CategoryData.map((item) => {
                                return <div key={item._id}>
                                    <Image src={item.image} alt={item.name} width={250} height={250} className="w-full rounded-3xl h-56 object-cover" />
                                    <h2 className="text-center">{item.name}</h2>
                                </div>
                            })
                        }

                    </Slider>
                </div>
            </div>

        </div>
    );
}


