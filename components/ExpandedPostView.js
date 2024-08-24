"use client"; // Ensure this component is treated as a client component

import React, { useState } from "react";
import Slider from "react-slick";
import {
    HeartIcon,
    UserIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSession } from "next-auth/react";

const NextArrow = ({ onClick, currentSlide, slideCount }) => {
    return (
        <button
            className={`absolute top-1/2 right-2 z-10 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg ${currentSlide === slideCount - 1 ? "hidden" : ""
                }`}
            onClick={onClick}
            aria-label="Next Slide"
        >
            <ChevronRightIcon className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
        </button>
    );
};

const PrevArrow = ({ onClick, currentSlide }) => {
    return (
        <button
            className={`absolute top-1/2 left-2 z-10 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg ${currentSlide === 0 ? "hidden" : ""
                }`}
            onClick={onClick}
            aria-label="Previous Slide"
        >
            <ChevronLeftIcon className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
        </button>
    );
};



const ExpandedPostView = ({ post, onClose }) => {
    const { data: session } = useSession();

    const [bgColor, setBgColor] = useState("#C0C0C0");
    const [bgOpacity, setBgOpacity] = useState(0.5);
    const [padding, setPadding] = useState("0.7em");
    const [font, setFont] = useState("#000000")



    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        adaptiveHeight: true,
        className: "overflow-hidden"
    };

    const formatText = (text) => {
        return (
            <div
                className="inline-block"
                style={{
                    color: font,
                    padding: padding,
                    textAlign: "center",
                }}
            >
                <span
                    className="goo"
                    style={{
                        backgroundColor: `${bgColor}${Math.round(bgOpacity * 255).toString(16).padStart(2, '0')}`,
                        // color: "#000000",
                        padding: "0.1em 1em",
                        borderRadius: "0.5em",
                        boxDecorationBreak: "clone",
                        WebkitBoxDecorationBreak: "clone",
                    }}
                >
                    {text}
                </span>
            </div>
        );
    };

    const styles = `
   
   .goo {
      font-size: 1rem;
      line-height: 1.3;
      display: inline; 
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      filter: url('#goo');
    }
    .goo:focus {
      outline: 0;
    }
  `;
    const StyleTag = () => (
        <style dangerouslySetInnerHTML={{ __html: styles }} />
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
            <StyleTag />
            <div className="relative w-full max-w-md h-auto flex bg-white rounded-lg overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 z-20 p-1 bg-white bg-opacity-50 rounded-full"
                >
                    <XMarkIcon className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
                </button>
                <div className="flex w-full h-full">
                    <div className="w-1/3 p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center mb-4">
                                <UserIcon className="w-8 h-8 text-[#3A1B0F] mr-2 fill-current" />
                                <span className="text-sm sm:text-base text-[#3A1B0F]">
                                    {session?.user?.name}
                                </span>
                            </div>
                            <div className="w-full p-2 overflow-y-auto">
                                {/* Input fields for customization */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Background Color:</label>
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Background Opacity:</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={bgOpacity}
                                        onChange={(e) => setBgOpacity(e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Font Colour</label>
                                    <input
                                        type="color"
                                        value={font}
                                        onChange={(e) => setFont(e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Padding:</label>
                                    <input
                                        type="text"
                                        value={padding}
                                        onChange={(e) => setPadding(e.target.value)}
                                        className="mt-1 block w-full border-black rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <HeartIcon className="w-5 h-5 text-[#3A1B0F] mr-1 fill-current" />
                                <span className="text-xs sm:text-sm text-[#3A1B0F]">
                                    {post.likes}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <UserIcon className="w-5 h-5 text-[#3A1B0F] mr-1 fill-current" />
                                <span className="text-xs sm:text-sm text-[#3A1B0F]">
                                    {post.views}
                                </span>
                            </div>
                            <button
                                className=" bg-white bg-opacity-50 rounded-full"
                            >
                                <TrashIcon className="w-4 h-4 text-[#3A1B0F] fill-current " />
                            </button>
                        </div>
                    </div>
                    <div className="w-2/3 h-full">
                        <Slider {...settings} className="w-full h-full">
                            {post.images.map((img, index) => (
                                <div key={index} className="relative h-full">
                                    <img
                                        src={img.imageUrl}
                                        alt={`Post ${post.id} - Image ${index + 1}`}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        {formatText(img.desc)}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandedPostView;
