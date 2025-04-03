"use client";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
    return (
        <button
            onClick={() => signOut()}
            className="border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-500 hover:text-black transition duration-200"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
