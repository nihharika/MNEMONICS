"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { toast } from "@/components/ui/use-toast";
import { Error } from "@/types/ErrorTypes";
const Page = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<any>([]);
    const logout = async () => {
        try {
            await axios.get("/api/logout");
            toast({
                title: "Logout Successfull",
            });
            router.refresh();
            router.push("/");
        } catch (error: unknown) {
            const Error = error as Error;
            toast({
                title: Error?.response?.data?.error || "Something went wrong",
            });
        }
    };
    const formatDate = (timestamp: Date) => {
        const date = new Date(timestamp);
        // Format the date as you desire
        return date.toLocaleString(); // You can customize the format using options if needed
    };
    const getUserInfo = async () => {
        try {
            const res = await axios.get("/api/get-users");
            setUserData(res.data.userData || []);
            console.log(res.data.userData);
        } catch (error) {
            toast({
                title: "Something went wrong",
            });
            console.log(error);
        }
    };
    useEffect(() => {
        getUserInfo();
    }, []);
    return (
        <div className=" mt-7 mb-44 flex flex-col justify-between gap-2">
            <img src={userData.profilePicture || ""} className="w-32 h-32 rounded-full mau" alt="" />
            <label htmlFor="username" className=" mt-2 text-xl capitalize font-bold">
                Username
            </label>
            <h1 className=" font-bold text-xl border-2 border-black/40 rounded-lg w-full p-3">{userData.username || "Not Found"}</h1>
            <label htmlFor="email" className="text-xl capitalize font-bold mt-4">
                Email
            </label>
            <span className=" text-lg opacity-70 border-2 border-black/40 rounded-lg w-full p-4 font-semibold">{userData.email || "notfound@gmail.com"}</span>
            <label htmlFor="email" className="text-xl capitalize font-bold mt-4">
                Description
            </label>
            <span className=" text-lg opacity-70 border-2 border-black/40 rounded-lg w-full p-4 font-semibold">{userData.userDescription || "man i dont really know"}</span>
            <label htmlFor="Joined At" className="text-xl capitalize font-bold mt-4">
                Joined At
            </label>
            <h2 className=" border-2 p-4 rounded-lg border-black/40">{formatDate(userData.createdAt)} </h2>
            <button onClick={logout} className=" bg-black rounded-lg p-5 text-white mt-6 text-xl font-semibold">
                Logout
            </button>
        </div>
    );
};

export default Page;
