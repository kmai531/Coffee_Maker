import React from "react";
import Link from "next/link";
import NavigationLinks from "./NavigationLinks";
import RightSideTopNav from "./RightSideTopNav";

const MyNavbar = () => {
    return (
        <div
            className="flex h-32 drop-shadow-lg justify-between overflow-x-hidden"
            data-theme="garden"
        >
            <div className="w-1/4 flex items-center justify-start">
                <Link href="/">
                    <div className="btn btn-ghost normal-case font-normal text-4xl hover:bg-transparent">
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                        >
                            <path d="M18.5 5l-1.224-2.447A1 1 0 0016.382 2H7.618a1 1 0 00-.894.553L5.5 5H3v2h18V5h-2.5zM6.734 21.142c.071.492.493.858.991.858h8.551a1 1 0 00.99-.858L19 9H5l1.734 12.142zM16 12l-.714 5H8.714L8 12h8z" />
                        </svg>
                        Coffee Maker
                    </div>
                </Link>
            </div>
            <div className="w-1/2 flex items-center justify-center">
                <NavigationLinks />
            </div>
            <div className="w-1/4 flex items-center justify-end mr-4">
                <RightSideTopNav />
            </div>
        </div>
    );
};

export default MyNavbar;
