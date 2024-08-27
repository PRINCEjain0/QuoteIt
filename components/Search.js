"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Home = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [profiles, setProfiles] = useState([]);
    const [showProfiles, setShowProfiles] = useState(false);

    const fetchProfiles = async () => {
        try {
            const response = await fetch('/api/profiles');
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            const text = await response.text();
            console.log('Response text:', text);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = JSON.parse(text);
            setProfiles(data);
            setShowProfiles(true);
        } catch (error) {
            console.error("Error fetching profiles:", error);
        }
    };
    const handleSearchClick = () => {
        if (!showProfiles) {
            fetchProfiles();
        }
    };

    const handleProfileSelect = (profileId) => {
        router.push(`/profile/${profileId}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Explore Profiles</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Click to see all profiles"
                    onClick={handleSearchClick}
                    className="w-full p-2 border rounded cursor-pointer"
                    readOnly
                />
            </div>
            {showProfiles && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profiles.map(profile => (
                        <div
                            key={profile.id}
                            className="border p-4 rounded cursor-pointer hover:bg-gray-100"
                            onClick={() => handleProfileSelect(profile.id)}
                        >
                            <div className="flex items-center mb-2">
                                <Image
                                    src={profile.image || "/default-profile-pic.jpg"}
                                    alt={profile.name || "Profile"}
                                    width={40}
                                    height={40}
                                    className="rounded-full mr-2"
                                />
                                <div>
                                    {/* <h2 className="font-bold">{profile.name || profile.email}</h2> */}
                                    <p className="text-sm text-gray-500">@{profile.profileName}</p>
                                </div>
                            </div>
                            <p className="text-sm mb-2">{profile.bio}</p>
                            {/* <p className="text-sm text-gray-500">Posts: {profile._count.posts}</p> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;