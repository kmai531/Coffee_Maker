"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const CustomerPage = () => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user && user.publicMetadata?.role === "admin") {
            router.push("/admin");
        }
    }, [user, router]);
    return (
        <div>
            <div>Customer</div>
        </div>
    );
};

export default CustomerPage;
