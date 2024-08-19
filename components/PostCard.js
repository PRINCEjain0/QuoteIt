import React, { useState } from "react";
import Slider from "react-slick";
import {
    HeartIcon,
    UserIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Stories from "./Stories";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PostCard = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [expandedImage, setExpandedImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const posts = [
        {
            images: [
                "https://images.unsplash.com/photo-1723142483664-1568bd19eb2c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1723395439527-20f1c97e035c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://plus.unsplash.com/premium_photo-1671599016130-7882dbff302f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cXVvdGVzfGVufDB8fDB8fHww",
            ],
            text: "What a quote",
            likes: 400,
            views: 700,
        },
        {
            image:
                "https://images.unsplash.com/photo-1723395439527-20f1c97e035c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            text: "Brilliant life",
            likes: 400,
            views: 700,
        },
        {
            image:
                "https://plus.unsplash.com/premium_photo-1671599016130-7882dbff302f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cXVvdGVzfGVufDB8fDB8fHww",
            text: "This is awesome",
            likes: 400,
            views: 700,
        },
    ];

    const NextArrow = ({ onClick, currentSlide, slideCount }) => {
        return (
            <button
                className={`absolute top-1/2 right-2 z-10 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg ${currentSlide === slideCount - 1 ? "hidden" : ""
                    }`}
                onClick={onClick}
                aria-label="Next Slide"
            >
                <ChevronRightIcon className="w-6 h-6 text-black" />
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
                <ChevronLeftIcon className="w-6 h-6 text-black" />
            </button>
        );
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        adaptiveHeight: true,
        beforeChange: (current, next) => setCurrentSlide(next),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    swipeToSlide: true,
                },
            },
        ],
    };

    const handleImageClick = (image) => {
        if (expandedImage === image) {
            setExpandedImage(null);
            setSelectedImage(null);
        } else {
            setExpandedImage(image);
            setSelectedImage(image);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Stories />
                {posts.map((post, index) => (
                    <div key={index} className="mb-4">
                        {post.images ? (
                            <div className="relative">
                                <Slider {...settings}>
                                    {post.images.map((image, imgIndex) => (
                                        <div key={imgIndex} className="relative">
                                            <img
                                                src={image}
                                                alt={`Slide ${imgIndex + 1}`}
                                                className={`w-full h-full object-cover rounded-md shadow-md cursor-pointer `}
                                                onClick={() => handleImageClick(image)}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        ) : (
                            <img
                                src={post.image}
                                alt={post.text}
                                className={`w-full h-full object-cover rounded-md shadow-md cursor-pointer `}
                                onClick={() => handleImageClick(post.image)}
                            />
                        )}
                        <div className="mt-2 px-4">
                            <div className="flex justify-start items-center text-gray-600 text-sm">
                                <div className="flex items-center">
                                    <span className="mr-2">
                                        <button className="p-2 rounded" aria-label="Like">
                                            <HeartIcon className="w-6 h-6 text-[#3A1B0F] fill-current" />
                                        </button>
                                    </span>
                                    <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">
                                        <button className="p-2 rounded" aria-label="Views">
                                            <UserIcon className="w-6 h-6 text-[#3A1B0F] fill-current" />
                                        </button>
                                    </span>
                                    <span>{post.views}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {expandedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative max-w-3xl max-h-full">
                        <img
                            src={expandedImage}
                            alt="Expanded view"
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                        <button
                            onClick={() => setExpandedImage(null)}
                            className="absolute top-4 right-4 p-2 bg-white rounded-full"
                        >
                            <XMarkIcon className="w-6 h-6 text-black" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;
