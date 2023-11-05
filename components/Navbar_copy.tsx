"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

import { AnimatePresence, motion } from "framer-motion";

type SmallNavMenuProps = {
    title: string;
    href: string;
};

const Navbar = () => {
    const { user } = useUser();
    const [userLink, setUserLink] = useState("/");

    const navLinks = [
        { title: "Home", href: "/" },
        { title: "Orders", href: "/" },
        {
            title: "Dashboard",
            href: { userLink },
        },
        { title: "Contact", href: "/admin" },
    ];

    const [themeMenuOpened, setThemeMenuOpened] = useState(false);
    const themeMenu = useRef<HTMLDivElement | null>(null);
    const themeMenuButton = useRef<HTMLLabelElement | null>(null);

    useEffect(() => {
        if (!themeMenuOpened) {
            (document.activeElement as HTMLElement)?.blur();
        } else if (
            themeMenuOpened &&
            !themeMenu.current?.contains(document.activeElement)
        ) {
            setThemeMenuOpened(false);
        }
    }, [themeMenuOpened]);
    const [open, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const mobileLinkVars = {
        initial: {
            y: "30vh",
            transition: {
                duration: 0.5,
                ease: [0.37, 0, 0.63, 1],
            },
        },
        open: {
            y: 0,
            transition: {
                ease: [0, 0.55, 0.45, 1],
                duration: 0.7,
            },
        },
    };

    useEffect(() => {
        if (!user) {
            setUserLink("/login");
        } else if (user && user.publicMetadata?.role === "admin") {
            setUserLink("/admin");
        } else {
            setUserLink("/customer");
        }
    }, [user]);

    const MobileNavLink: React.FC<SmallNavMenuProps> = ({ title, href }) => {
        return (
            <motion.div
                variants={mobileLinkVars}
                className="text-5xl uppercase text-black"
            >
                <Link onClick={toggleMenu} href={href}>
                    {title}
                </Link>
            </motion.div>
        );
    };

    const menuVars = {
        initial: {
            scaleY: 0,
        },
        animate: {
            scaleY: 1,
            transition: {
                duration: 0.5,
                ease: [0.12, 0, 0.39, 0],
            },
        },
        exit: {
            scaleY: 0,
            transition: {
                delay: 0.5,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };
    const containerVars = {
        initial: {
            transition: {
                staggerChildren: 0.09,
                staggerDirection: -1,
            },
        },
        open: {
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.09,
                staggerDirection: 1,
            },
        },
    };
    return (
        <div>
            <div
                className="navbar bg-base-100 h-32 drop-shadow justify-between"
                data-theme="garden"
            >
                <div className="md:navbar-start lg:ml-2">
                    <a className="btn btn-ghost normal-case font-normal text-4xl hover:bg-transparent">
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                        >
                            <path d="M18.5 5l-1.224-2.447A1 1 0 0016.382 2H7.618a1 1 0 00-.894.553L5.5 5H3v2h18V5h-2.5zM6.734 21.142c.071.492.493.858.991.858h8.551a1 1 0 00.99-.858L19 9H5l1.734 12.142zM16 12l-.714 5H8.714L8 12h8z" />
                        </svg>
                        Coffee Maker
                    </a>
                </div>
                <div className="hidden lg:flex navbar-center gap-5">
                    <Link
                        className="btn btn-ghost font-normal normal-case text-2xl hover:bg-transparent"
                        href="/menu"
                    >
                        Menu
                    </Link>
                    <Link
                        className="btn btn-ghost font-normal normal-case text-2xl hover:bg-transparent"
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="btn btn-ghost font-normal normal-case text-2xl hover:bg-transparent"
                        href={userLink}
                    >
                        Dashboard
                    </Link>
                </div>
                <div className="navbar-end lg:mr-4">
                    <div className="hidden lg:flex lg:mr-2">
                        <UserButton afterSignOutUrl="/" />
                    </div>

                    <div
                        ref={themeMenu}
                        className="hidden lg:flex lg:dropdown lg:dropdown-end"
                    >
                        <label
                            ref={themeMenuButton}
                            tabIndex={0}
                            className="btn btn-ghost btn-circle"
                            onBlur={(e) => {
                                setThemeMenuOpened(false);
                            }}
                            onClick={(e) => {
                                if (themeMenuOpened) {
                                    setThemeMenuOpened(false);
                                } else {
                                    setThemeMenuOpened(true);
                                }
                            }}
                        >
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

                    <div className="lg:hidden">
                        <button
                            className="btn btn-ghost hover:bg-transparent"
                            onClick={toggleMenu}
                        >
                            {" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-8 h-8 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        variants={menuVars}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed left-0 top-0 w-full h-screen origin-top bg-orange-200 text-black p-10 z-20"
                    >
                        <div className="flex h-full flex-col">
                            <div className="flex justify-between">
                                <h1 className="text-lg text-black"></h1>
                                <p
                                    className="cursor-pointer text-md text-black"
                                    onClick={toggleMenu}
                                >
                                    Close
                                </p>
                            </div>
                            <motion.div
                                variants={containerVars}
                                initial="initial"
                                animate="open"
                                exit="initial"
                                className="flex flex-col h-full justify-center font-lora items-center gap-6 "
                            >
                                {navLinks.map((link, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="overflow-hidden"
                                        >
                                            <MobileNavLink
                                                key={index}
                                                title={link.title}
                                                href={userLink}
                                            />
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
