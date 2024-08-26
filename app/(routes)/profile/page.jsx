"use client"
import { useSession } from "next-auth/react";
import ProfileHeader from "../../../components/ProfileHeader";
import PhotoGrid from "../../../components/PhotoGrid";
import Navbar from "../../../components/Navbar";
import AddPost from "../../../components/AddPost";

export default function Home() {
    const { data: session } = useSession();
    // console.log(session)

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="container mx-auto px-4">
                <Navbar />
                <ProfileHeader session={session} />
                <AddPost />
                <PhotoGrid />
            </div>
        </div>
    );
}