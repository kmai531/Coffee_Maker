"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";

const RightSideTopNav = () => {
    const [open, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    return (
        <div className="lg:flex gap-3 hidden drop-shadow">
            <div className="mt-2">
                <UserButton afterSignOutUrl="/" />
            </div>
            <div>
                <label className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <span className="badge badge-sm indicator-item text-lg">
                            2
                        </span>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default RightSideTopNav;
