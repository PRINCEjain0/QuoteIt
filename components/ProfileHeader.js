"use client"
import React, { useState, useRef } from 'react';

export default function ProfileHeader({ session }) {
    const [profile, setProfile] = useState({
        username: "travelenthusiast",
        profilePicture: "https://images.unsplash.com/photo-1518288774672-b94e808873ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
        posts: 3,
        followers: 1337,
        following: 420,
        bio: "Adventure seeker | Photography lover | World explorer",
    });

    const isOwner = session?.user?.email;

    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState(profile.username);
    const [editedBio, setEditedBio] = useState(profile.bio);
    const [editedPhoto, setEditedPhoto] = useState(profile.profilePicture);
    const fileInputRef = useRef(null);

    const handleSave = () => {
        setProfile(prev => ({
            ...prev,
            username: editedUsername,
            bio: editedBio,
            profilePicture: editedPhoto
        }));
        setIsEditing(false);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="flex flex-col ml-8 sm:flex-row items-center mb-8 sm:mb-12">
            <div className="relative">
                <img
                    src={isEditing ? editedPhoto : profile.profilePicture}
                    alt={profile.username}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-md shadow-md mb-4 sm:mb-0 sm:mr-8 object-cover cursor-pointer"
                    onClick={isOwner && isEditing ? triggerFileInput : undefined}
                />
                {isOwner && isEditing && (
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                    />
                )}
                {isOwner && isEditing && (
                    <div className="sm:w-32 absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1">
                        Click to change
                    </div>
                )}
            </div>
            <div className="text-center sm:text-left">
                {isOwner && isEditing ? (
                    <input
                        type="text"
                        value={editedUsername}
                        onChange={(e) => setEditedUsername(e.target.value)}
                        className="w-full p-2 border rounded text-[#5C4033]"
                    />
                ) : (
                    <h1 className="text-2xl sm:text-3xl text-[#5C4033] font-light mb-2 sm:mb-4">
                        {profile.username}
                    </h1>
                )}
                <div className="flex justify-center sm:justify-start mb-2 sm:mb-4">
                    <span className="mr-4 sm:mr-8 text-[#5C4033]">
                        {profile.posts} posts
                    </span>
                    <span className="mr-4 sm:mr-8 text-[#5C4033]">
                        {profile.followers} followers
                    </span>
                    <span className="mr-4 sm:mr-8 text-[#5C4033]">
                        {profile.following} following
                    </span>
                </div>
                {isOwner && isEditing ? (
                    <textarea
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                        className="w-full p-2 border rounded text-[#5C4033]"
                        rows="3"
                    />
                ) : (
                    <p className="max-w-md text-[#5C4033]">{profile.bio}</p>
                )}
                {isOwner && (
                    <div className="mt-4">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="bg-[#5C4033] text-white px-4 py-2 rounded mr-2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditedUsername(profile.username);
                                        setEditedBio(profile.bio);
                                        setEditedPhoto(profile.profilePicture);
                                    }}
                                    className="bg-gray-300 text-[#5C4033] px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-[#5C4033] text-white px-4 py-2 rounded"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}