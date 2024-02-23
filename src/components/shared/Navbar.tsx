"use client";
import React from "react";
import { BellRing, CircleUser, Home, Laptop, Map, MessageCircleMore, Moon, Sparkles, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const Navbar = () => {
    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: Home,
        },
        {
            name: "Chat",
            link: "/anynomous-chat",
            icon: MessageCircleMore,
        },
        {
            name: "Map",
            link: "/map",
            icon: Map,
        },
        {
            name: "Alert",
            link: "/alert",
            icon: BellRing,
        },
        {
            name: "Profile",
            link: "/profile",
            icon: CircleUser,
        },
    ];
    const pathname = usePathname();
    const { setTheme } = useTheme();
    if (pathname === "/login" || pathname === "/register" || pathname === "/forgot-password" || pathname === "/reset-password" || pathname === "/verifyToken") {
        return null;
    }
    return (
        <nav className=" max-w-[800px] m-auto">
            <section className="flex justify-between z-50">
                <div className="flex items-center gap-5">
                    <Moon onClick={() => setTheme("dark")} />
                    <Sun onClick={() => setTheme("light")} />
                    <Laptop onClick={() => setTheme("system")} />
                </div>
                <Link
                    href={"/ai-chat"}
                    className=" bg-[#f5f0e5] dark:text-black w-32 text-center text-lg
             p-3 rounded-full font-bold flex items-center justify-center gap-2"
                >
                    <Sparkles />
                    AI Chat
                </Link>
            </section>
            <div className=" max-w-[900px] m-auto w-full bg-white dark:bg-black border-t-2 border-black/10 dark:border-white/10 fixed z-50 left-0 right-0 bottom-0">
                <div className="flex gap-2 justify-between flex-wrap border-t-2 border-black/10 dark:border-white/10">
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
        </nav>
    );
};

export default Navbar;
