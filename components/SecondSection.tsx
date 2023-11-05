import Link from "next/link";
import React from "react";

const SecondSection = () => {
    return (
        <div data-theme="garden" className="">
            <div className="flex flex-col items-center py-40">
                <h1 className="text-4xl">More to explore</h1>
                <Link href="/">
                    <button className="btn btn-accent mt-6 btn-lg">
                        See Menu
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SecondSection;
