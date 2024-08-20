// PostCard.js
"use client";
import React, { useState, useEffect } from "react";
import { HeartIcon, UserIcon } from "@heroicons/react/24/outline";
import ExpandedPostView from "./ExpandedPostView";
import { useSession } from "next-auth/react";


const PostCard = () => {
    const [posts, setPosts] = useState([]);
    const [expandedPost, setExpandedPost] = useState(null);
    const { data: session } = useSession();
    const userId = session?.user?.id;
    console.log("he " + userId)



    useEffect(() => {
        // if (session?.user?.id) {
        fetchPosts();
        // }

    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`/api/post/read/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const likePost = async (postId) => {
        // Implement like functionality
    };

    const incrementViews = async (postId) => {
        // Implement view increment functionality
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
                        <img
                            src={post.img}
                            alt={`Post ${post.id}`}
                            className="w-full h-64 object-cover rounded-md shadow-md cursor-pointer"
                            onClick={() => handleImageClick(post)}
                        />
                        <div className="absolute bottom-2 left-2 flex items-center space-x-2 text-white text-sm bg-black bg-opacity-50 rounded-full px-3 py-1">
                            <button
                                onClick={() => likePost(post.id)}
                                className="flex items-center"
                            >
                                <HeartIcon className="w-4 h-4 text-[#3A1B0F] mr-1 fill-current" />
                                <span>{post.likes || 0}</span>
                            </button>
                            <div className="flex items-center">
                                <UserIcon className="w-4 h-4 text-[#3A1B0F] mr-1 fill-current" />
                                <span>{post.views || 0}</span>
                            </div>
                        </div>
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