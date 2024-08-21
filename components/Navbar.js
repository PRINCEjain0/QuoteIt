"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        console.log("Session status:", status);
        console.log("Session data:", session);
    }, [session, status]);

    const handleSignIn = () => {
        router.push("/signin");
    };

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        // router.push("/signin");
    };



    return (
        <nav className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
                {/* <Image src="/Logo.png" alt="Logo" width={32} height={32} /> */}
                <h1 className="text-xl text-[#3A1B0F]">QuoteIt</h1>
            </div>
            <div className="flex items-center space-x-4">
                {status === "loading" ? (
                    <p></p>
                ) : status === "authenticated" ? (
                    <>
                        <p className="text-[#3A1B0F]" >Welcome, {session.user.name || session.user.email}</p>
                        <button
                            onClick={handleSignOut}
                            className="bg-[#F9F16F] text-[#3A1B0F] px-4 py-2 rounded"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleSignIn}
                        className="bg-[#F9F16F] text-[#3A1B0F] px-4 py-2 rounded"
                    >
                        Sign In
                    </button>
                )}
                <div className="rounded-full overflow-hidden w-10 h-10">
                    {/* <Image
                        src={session?.user?.image || "/default-profile-pic.jpg"}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="object-cover"
                    /> */}
                </div>
            </div>
        </nav >
    );
};

export default Navbar;