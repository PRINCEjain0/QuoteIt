"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProfileHeader from '@/components/ProfileHeader';
import PostCard from '@/components/PostCard';

export default function UserProfilePage() {
    const [userData, setUserData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/profile/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <ProfileHeader profile={userData.user} />
            <PostCard posts={userData.posts} />
        </div>
    );
}