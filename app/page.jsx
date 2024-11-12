"use client";
import Navbar from "../components/Navbar";
import Stories from "../components/Stories";
import PostCard from "../components/PostCard";
import {
  HomeIcon,
  BookmarkIcon,
  PlusIcon,
  UserIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();

  const profile = () => {

    router.push("/profile");

  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4">
          <Navbar />

          <PostCard />
        </div>
      </div>
      <button className="fixed bottom-0  bg-[#F9F16F] w-full flex justify-center rounded p-4  sm:hidden" onClick={profile}>
        {/* <button className="p-2 rounded" aria-label="Home">
          <HomeIcon className="w-6 h-6 text-[#3A1B0F] fill-current" />
        </button>
        <button className="p-2 rounded" aria-label="User">
          <UserIcon className="w-6 h-6 text-[#3A1B0F] fill-current" />
        </button>
        <button className="p-2 rounded" aria-label="Add">
          <PlusIcon className="w-6 h-6 text-[#3A1B0F] fill-current" />
        </button>
        <button className="p-2 rounded" aria-label="Bookmark">
          <BookmarkIcon className="w-6 h-6 text-[#3A1B0F] fill-current" />
        </button>
        <button className="p-2 rounded" aria-label="Location">
          <MapPinIcon className="w-6 h-6 text-[#3A1B0F] fill-current" />
        </button> */}

        {/* <button className="bg-[#F9F16F] text-[#3A1B0F] px-4 py-2 rounded font-medium" aria-label="User" onClick={profile}> */}
        Add Post
        {/* </button> */}
      </button>
    </>
  );
}
