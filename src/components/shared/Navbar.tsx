"use client";
import React from "react";
import { BellRing, CircleUser, Home, Map, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: Home,
        },
        {
            name: "Chat",
            link: "/chat",
            icon: MessageCircleMore,
        },
        {
            name: "Map",
            link: "/emergency-call",
            icon: Map,
        },
        {
            name: "Alert",
            link: "/live-chat",
            icon: BellRing,
        },
        {
            name: "Profile",
            link: "/profile",
            icon: CircleUser,
        },
    ];
    const pathname = usePathname();
    return (
        <>
            <nav className="flex justify-between">
                <Link
                    href={"/emergency-call"}
                    className=" bg-[#009963] text-lg w-44
             p-3 tracking-wide text-center h-full rounded-full text-white font-bold"
                >
                    Emergency Call
                </Link>
                <Link
                    href={"/live-chat"}
                    className=" bg-[#f5f0e5] w-32 text-center text-lg
             p-3 rounded-full font-bold"
                >
                    Live Chat
                </Link>
            </nav>
            <div className="w-full h-auto fixed bottom-0 right-0 left-0">
                <div className="flex gap-2 justify-between flex-wrap border-t-2 border-black/10">
                    {navItems.map((item, index) => {
                        const isActive = (pathname.includes(item.link) && item.link.length > 1) || pathname === item.link;
                        return (
                            <Link href={item.link} key={index}>
                                <span className="flex gap-2 flex-col items-center justify-center p-4">
                                    <item.icon size={24} className={`${isActive && "fill-black"}`} />
                                    <p>{item.name}</p>
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Navbar;
