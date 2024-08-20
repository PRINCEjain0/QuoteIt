"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
    const router = useRouter();
    const { data: session, status, update } = useSession();

    useEffect(() => {
        console.log("Session status:", status);
        console.log("Session data:", session);
    }, [session, status]);

    const handleSignIn = async () => {
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result?.ok) {
            await update(); // Force update the session
            router.push("/");
        } else {
            console.error("Sign in failed:", result?.error);
        }
    };

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push("/signin");
    };

    return (
        <nav className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
                <h1 className="text-xl text-[#3A1B0F]">QuoteIt</h1>
            </div>
            <div className="flex items-center space-x-4">
                {status === "loading" ? (
                    <p></p>
                ) : status === "authenticated" ? (
                    <>
                        <p>Welcome, {session.user.name || session.user.email}</p>
                        <button
                            onClick={handleSignOut}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleSignIn}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;