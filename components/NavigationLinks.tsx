"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

const NavigationLinks = () => {
    const [userLink, setUserLink] = useState("/");
    const { user } = useUser();
    const navLinks = [
        { title: "Home", link: "/" },
        { title: "Orders", link: "/" },
        {
            title: "Dashboard",
            link: userLink,
        },
    ];

    useEffect(() => {
        if (!user) {
            setUserLink("/login");
        } else if (user && user.publicMetadata?.role === "admin") {
            setUserLink("/admin");
        } else {
            setUserLink("/customer");
        }
    }, [user]);

    return (
        <div className="hidden lg:flex">
            {navLinks.map((item, idx) => (
                <Link
                    className="btn btn-ghost font-normal normal-case text-2xl hover:bg-transparent"
                    key={idx}
                    href={item.link}
                >
                    {item.title}
                </Link>
            ))}
        </div>
    );
};

export default NavigationLinks;
