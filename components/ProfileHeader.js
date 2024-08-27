"use client"
import React, { useState, useRef, useEffect } from 'react';

export default function ProfileHeader({ session }) {
    const [profile, setProfile] = useState({
        username: session?.user?.name || "User",
        profilePicture: session?.user?.image || "https://example.com/default-avatar.jpg",
        bio: null,
    });

    const isOwner = session?.user?.email;

    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState(profile.username);
    const [editedBio, setEditedBio] = useState(profile.bio);
    const [editedPhoto, setEditedPhoto] = useState(profile.profilePicture);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/api/profile/${session.user.id}`);
                const data = await response.json();
                setProfile({
                    username: data.username || session?.user?.name || "User",
                    profilePicture: data.profilePicture || session?.user?.image || "https://example.com/default-avatar.jpg",
                    bio: data.bio || null,
                });
                setEditedUsername(data.username || session?.user?.name || "User");
                setEditedBio(data.bio || null);
                setEditedPhoto(data.profilePicture || session?.user?.image || "https://example.com/default-avatar.jpg");
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        if (session?.user?.id) {
            fetchProfile();
        }
    }, [session]);

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/profile/${session.user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: editedUsername,
                    bio: editedBio,
                    profilePicture: editedPhoto
                }),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setProfile({
                    username: updatedData.username,
                    bio: updatedData.bio,
                    profilePicture: updatedData.profilePicture
                });
                setIsEditing(false);
            } else {
                const errorData = await response.json();
                console.error("Failed to update profile:", errorData);
                alert(`Failed to update profile: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert(`Error updating profile: ${error.message}`);
        }
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
                {isOwner && isEditing ? (
                    <textarea
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                        className="w-full p-2 border rounded text-[#5C4033]"
                        rows="3"
                        placeholder="Add a bio"
                    />
                ) : (
                    <p className="max-w-md text-[#5C4033]">
                        {profile.bio ? profile.bio : "Add a bio"}
                    </p>
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