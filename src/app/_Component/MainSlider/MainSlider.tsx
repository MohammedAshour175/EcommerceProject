"use client"
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="grid grid-cols-12 m-6">
            <div className="col-span-10">
                <div className="slider-container pb-5 h-96">
                    <Slider {...settings}>
                        <div>
                            <Image src='/images/slider-image-2.jpeg' alt="imgSlider1" width={1000} height={1000} className="w-full h-96 object-cover" />
                        </div>
                        <div>
                            <Image src='/images/slider-image-1.jpeg' alt="imgSlider2" width={1000} height={1000} className="w-full h-96 object-cover" />
                        </div>
                        <div>
                            <Image src='/images/slider-image-3.jpeg' alt="imgSlider3" width={1000} height={1000} className="w-full h-96 object-cover" />
                        </div>
                    </Slider>
                </div>
            </div>
            <div className="col-span-2">
                <div>
                    <Image src='/images/slider-image-1.jpeg' alt="imgSlider2" width={500} height={500} className="h-48 object-cover" />
                </div>
                <div>
                    <Image src='/images/slider-image-3.jpeg' alt="imgSlider3" width={500} height={500} className="h-48 object-cover" />
                </div>
            </div>

        </div>
    );
}


