"use client";
import { useState } from "react";

export default function AddPost() {
    const [showForm, setShowForm] = useState(false);
    const [text, setText] = useState("");
    const [bgImageUrl, setBgImageUrl] = useState("");
    const [font, setFont] = useState("Arial");

    function handleButtonClick() {
        setShowForm(true);
    }

    function handleTextChange(event) {
        setText(event.target.value);
    }

    function handleBgImageUrlChange(event) {
        setBgImageUrl(event.target.value);
    }

    function handleFontChange(event) {
        setFont(event.target.value);
    }

    function addPost() {
        if (!text || !bgImageUrl) {
            alert("Please enter both text and background image URL.");
            return;
        }

        console.log("Post Details:", {
            text,
            bgImageUrl,
            font,
        });
        // the post creation logic here

        setText("");
        setBgImageUrl("");
        setFont("Arial");
        setShowForm(false);
    }

    return (
        <div className="flex flex-col items-center ">
            {!showForm ? (
                <button
                    className="bg-blue-500 py-2 px-12 rounded-md mb-4 text-white"
                    onClick={handleButtonClick}
                >
                    Add Post
                </button>
            ) : (
                <div className="w-full p-8">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Text:</label>
                        <textarea
                            value={text}
                            onChange={handleTextChange}
                            className="w-full p-2 border rounded-md"
                            rows="4"
                            placeholder="Enter your text here..."
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 ">
                            Background Image URL:
                        </label>
                        <input
                            type="text"
                            value={bgImageUrl}
                            onChange={handleBgImageUrlChange}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter background image URL..."
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Font:</label>
                        <select
                            value={font}
                            onChange={handleFontChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="Arial">Arial</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Tahoma">Tahoma</option>
                            <option value="Trebuchet MS">Trebuchet MS</option>
                        </select>
                    </div>
                    <button
                        className="bg-blue-500 py-2 px-12 rounded-md text-white mb-2"
                        onClick={addPost}
                    >
                        Upload Post
                    </button>
                </div>
            )}
        </div>
    );
}
