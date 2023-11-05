"use client";
import p2 from "../public/coffee1.jpg";
import p3 from "../public/coffee2.jpg";
import p4 from "../public/coffee3.jpg";
import React from "react";
import Image from "next/image";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const BillBoard = () => {
    return (
        <div className="">
            <Splide
                options={{
                    type: "loop",
                    pauseOnHover: false,
                    autoplay: true,
                    height: "55rem",
                    perPage: 1,
                }}
                aria-label="React Splide Example"
                hasTrack={false}
            >
                <SplideTrack className="splide__track">
                    <SplideSlide className="item splide__slide">
                        <Image src={p2} alt="Image 1" />
                    </SplideSlide>
                    <SplideSlide className="item splide__slide">
                        <Image src={p3} alt="Image 2" />
                    </SplideSlide>
                    <SplideSlide className="item splide__slide">
                        <Image src={p4} alt="Image 2" />
                    </SplideSlide>
                </SplideTrack>
            </Splide>
        </div>
    );
};

export default BillBoard;
