// PostCard.js
"use client";
import React, { useState, useEffect } from "react";
import { HeartIcon, UserIcon, TrashIcon } from "@heroicons/react/24/outline";
import ExpandedPostView from "./ExpandedPostView";

const PostCard = () => {
    const samplePosts = [
        {
            id: 1,
            images: [
                "https://images.unsplash.com/photo-1723142483664-1568bd19eb2c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1723395439527-20f1c97e035c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://plus.unsplash.com/premium_photo-1671599016130-7882dbff302f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cXVvdGVzfGVufDB8fDB8fHww",
            ],
            likes: 400,
            views: 700,
        },
        {
            id: 2,
            images: [
                "https://images.unsplash.com/photo-1723395439527-20f1c97e035c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ],
            likes: 350,
            views: 600,
        },
        {
            id: 3,
            images: [
                "https://plus.unsplash.com/premium_photo-1671599016130-7882dbff302f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cXVvdGVzfGVufDB8fDB8fHww",
            ],
            likes: 450,
            views: 800,
        },
    ];

    const [posts, setPosts] = useState(samplePosts);
    const [expandedPost, setExpandedPost] = useState(null);

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

    const addPost = async (newPost) => {
        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });
            const data = await response.json();
            setPosts([...posts, data]);
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    const deletePost = async (postId) => {
        try {
            await fetch(`/api/posts/delete/${postId}`, {
                method: "DELETE",
            });
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {posts.map((post) => (
                    <div key={post.id} className="relative">
                        {post.images && post.images.length > 0 ? (
                            <img
                                src={post.images[0]}
                                alt={`Post ${post.id}`}
                                className="w-full h-64 object-cover rounded-md shadow-md cursor-pointer"
                                onClick={() => handleImageClick(post)}
                            />
                        ) : (
                            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md shadow-md">
                                <span className="text-gray-500">No image available</span>
                            </div>
                        )}
                        <div className="absolute bottom-2 left-2 flex items-center space-x-2 text-white text-sm bg-black bg-opacity-50 rounded-full px-3 py-1">
                            <button
                                onClick={() => likePost(post.id)}
                                className="flex items-center"
                            >
                                <HeartIcon className="w-4 h-4 text-[#3A1B0F]  mr-1 fill-current" />
                                <span>{post.likes}</span>
                            </button>
                            <div className="flex items-center">
                                <UserIcon className="w-4 h-4 text-[#3A1B0F]  mr-1 fill-current" />
                                <span>{post.views}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => deletePost(post.id)}
                            className="absolute top-2 right-2 p-2 bg-white bg-opacity-50 rounded-full"
                        >
                            <TrashIcon className="w-4 h-4 text-[#3A1B0F] fill-current " />
                        </button>
                    </div>
                ))}
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
