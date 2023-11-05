"use client";
import React from "react";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

const AdminPage = () => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user && user.publicMetadata?.role !== "admin") {
            router.push("/");
        }
    }, [user, router]);

    return (
        <div className="flex flex-col">
            <h1>Admin page</h1>
            <Link href="/admin/inventory">Inventory</Link>
            <Link href="/admin/recipe">Add Recipe</Link>
        </div>
    );
};

export default AdminPage;
