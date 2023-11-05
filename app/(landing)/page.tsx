import React from "react";
import lqip from "lqip-modern";
import { SignInButton, UserButton } from "@clerk/nextjs";
import Navbar from "@/components/MyNavbar1";
import BillBoard from "@/components/Billboard";
import { featureItems } from "@/components/lib/data";
import MainSection from "@/components/MainSection";
import Image from "next/image";
import Footer from "@/components/Footer";
import SecondSection from "@/components/SecondSection";

async function getUrl(url: string) {
    // const imgData = await fetch(
    //     new URL(
    //         "https://res.cloudinary.com/dltqlwg8m/image/upload/v1692235838/CoffeeMaker-Test/Test/4_bz2cc0.jpg"
    //     )
    // );
    const imgData = await fetch(new URL(url));
    const arrayBufferData = await imgData.arrayBuffer();
    const lqipData = await lqip(Buffer.from(arrayBufferData));
    return lqipData.metadata.dataURIBase64;
}

async function getAllBlurUrl() {
    const lqipDataArray = await Promise.all(
        featureItems.map((item) => getUrl(item.img))
    );
    return lqipDataArray;
}

const LandingPage = async () => {
    // const blurUrls = await getAllBlurUrl();
    // const blurUrls = ["hjo"];
    return (
        <div>
            {/* <Navbar /> */}
            <BillBoard />
            <MainSection />
            <SecondSection />
            {/* <div className="mt-10">
                <UserButton afterSignOutUrl="/" />
                <h1>Landing page (unprotected)</h1>
                <SignInButton />
            </div> */}
            {/* <Footer /> */}
        </div>
    );
};

export default LandingPage;
