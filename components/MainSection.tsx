"use client";
import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
import { useState, useEffect } from "react";
import { featureItems } from "./lib/data";

type MainSectionProps = {
    blurUrls: string[];
};
const MainSection = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth > 768);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    return (
        <div className="bg-orange-200 py-44">
            <div className="block lg:flex">
                <div className="lg:w-1/2 flex flex-col justify-center items-center select-none">
                    <h1 className="font-semibold mb-3 text-6xl">About Us</h1>

                    <h3 className="mb-2 text-4xl text-center">
                        We make great coffee
                    </h3>
                    <h2 className="">And not just coffee</h2>
                </div>
                <div className="mt-28 lg:w-1/2 lg:mt-0">
                    <div className="mx-10">
                        <h1 className="text-6xl mb-14 text-center select-none">
                            Featured Drink
                        </h1>
                        <Splide
                            options={{
                                rewind: "false",
                                height: "25rem",
                                perPage: isLargeScreen ? 4 : 1,
                                gap: "2rem",
                            }}
                            aria-label="React Splide Example"
                            hasTrack={false}
                        >
                            <SplideTrack className="splide__track">
                                {featureItems.map((item, idx) => (
                                    <SplideSlide
                                        key={item.id}
                                        className="item splide__slide"
                                    >
                                        <Image
                                            // className="transition-opacity opacity-0 duration-[2s]"
                                            src={item.img}
                                            alt={item.title}
                                            width={1920}
                                            height={1080}

                                            // onLoadingComplete={(img) =>
                                            //     img.classList.remove(
                                            //         "opacity-0"
                                            //     )
                                            // }
                                        />
                                    </SplideSlide>
                                ))}
                            </SplideTrack>
                        </Splide>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainSection;
