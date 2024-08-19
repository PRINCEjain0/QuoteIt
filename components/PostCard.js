// PostCard.js
"use client";
import React, { useState, useEffect } from "react";
import { HeartIcon, UserIcon } from "@heroicons/react/24/outline";
import ExpandedPostView from "./ExpandedPostView";
import Stories from "./Stories";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PostCard = () => {
    const samplePosts = [
        {
            id: 1,
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
            id: 2,
            images: [
                "https://images.unsplash.com/photo-1723395439527-20f1c97e035c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ],
            text: "Brilliant life",
            likes: 350,
            views: 600,
        },
        {
            id: 3,
            images: [
                "https://plus.unsplash.com/premium_photo-1671599016130-7882dbff302f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cXVvdGVzfGVufDB8fDB8fHww",
            ],
            text: "This is awesome",
            likes: 450,
            views: 800,
        },
    ];

    const [posts, setPosts] = useState(samplePosts);
    const [expandedPost, setExpandedPost] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch("/api/posts");
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const likePost = async (postId) => {
        try {
            const response = await fetch(`/api/posts/like/${postId}/like`, {
                method: "POST",
            });
            const updatedPost = await response.json();
            setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const incrementViews = async (postId) => {
        try {
            const response = await fetch(`/api/posts/view/${postId}/view`, {
                method: "POST",
            });
            const updatedPost = await response.json();
            setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
        } catch (error) {
            console.error("Error incrementing views:", error);
        }
    };

    const handleImageClick = (post) => {
        setExpandedPost(post);
        incrementViews(post.id);
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false, // Change this to false
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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Stories />
                <div className="grid grid-cols-1 gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="relative aspect-w-16 aspect-h-9">
                            {post.images && post.images.length > 0 ? (
                                <Slider {...settings} className="h-full">
                                    {post.images.map((image, imgIndex) => (
                                        <div key={imgIndex} className="h-full">
                                            <img
                                                src={image}
                                                alt={`Post ${post.id} - Image ${imgIndex + 1}`}
                                                className="w-full h-full object-cover rounded-md shadow-md cursor-pointer"
                                                onClick={() => handleImageClick(post)}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md shadow-md">
                                    <span className="text-gray-500">No image available</span>
                                </div>
                            )}
                            <div className="absolute bottom-2 left-2 flex items-center space-x-2 text-white text-sm bg-black bg-opacity-50 rounded-full px-3 py-1">
                                <button
                                    onClick={() => likePost(post.id)}
                                    className="flex items-center"
                                >
                                    <HeartIcon className="w-4 h-4 text-[#3A1B0F] mr-1 fill-current" />
                                    <span>{post.likes}</span>
                                </button>
                                <div className="flex items-center">
                                    <UserIcon className="w-4 h-4 text-[#3A1B0F] mr-1 fill-current" />
                                    <span>{post.views}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {expandedPost && (
                <ExpandedPostView
                    post={expandedPost}
                    onClose={() => setExpandedPost(null)}
                />
            )}
        </div>
    );
};

export default PostCard;