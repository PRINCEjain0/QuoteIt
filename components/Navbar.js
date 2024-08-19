// components/Navbar.js
import React from "react";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
                <img src="Logo.png" alt="Logo" className="w-8 h-8" />
                <h1 className=" text-xl text-[#3A1B0F]">QuoteIt</h1>
            </div>
            <div className="rounded-full overflow-hidden w-10 h-10">
                <img
                    src="/profile-pic.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </div>
        </nav>
    );
};

export default Navbar;
