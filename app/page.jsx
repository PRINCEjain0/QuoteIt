"use client";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  const handleAddPost = () => {
    if (status === "authenticated") {
      router.push("/profile");
    } else {
      // Redirect to login page or show an error message
      console.log("User is not authenticated");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <Navbar />
        <PostCard />
        {status === "authenticated" && (
          <button
            className="fixed bottom-0 left-4 right-4 bg-[#F9F16F] px-6 py-3 flex justify-center items-center rounded-md shadow-md text-[#3A1B0F] font-medium sm:hidden"
            onClick={handleAddPost}
          >
            Add Post
          </button>
        )}
      </div>
    </div>
  );
}