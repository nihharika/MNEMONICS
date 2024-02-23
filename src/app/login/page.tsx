"use client";
import React from "react";
import Link from "next/link";

import { Label } from "@/components/ui/label";
const page = () => {
    return (
        <div className="mx-auto max-w-sm space-y-4 flex flex-col justify-center items-center min-h-screen">
            <div className="space-y-2 text-center w-full">
                <img
                    alt="College logo"
                    className="mx-auto"
                    height="120"
                    src="https://cdn.discordapp.com/attachments/1172417618288840765/1210609823167676427/WhatsApp_Image_2024-02-23_at_20.59.43-removebg-preview-transformed.png?ex=65eb2f41&is=65d8ba41&hm=a240320e8a3642388a55817edfa2b30d096df3a4f5e6ee8fc5a12599e29c9acb&"
                    style={{
                        aspectRatio: "120/120",
                        objectFit: "cover",
                    }}
                    width="120"
                />
                <h1 className="text-3xl font-bold">Login</h1>
            </div>
            <div className="space-y-2 w-full flex flex-col">
                <Label htmlFor="username">Email</Label>
                <input type="email" placeholder="Enter Your Email" required className=" p-4 bg-black/10 text-black focus:outline-none  border-2 rounded-lg " />
            </div>
            <div className="space-y-2 flex flex-col w-full">
                <Label htmlFor="password">Password</Label>
                <input type="password" placeholder="Enter Your Password" required className=" p-4 bg-black/10 text-black focus:outline-none  border-2 rounded-lg " />
            </div>

            <button className=" bg-[#519259] p-4 w-full rounded-full text-white font-bold">Login</button>
            <Link href={"/register"} className=" bg-[#F0BB62] text-center p-4 w-full rounded-full font-bold text-black">
                Register
            </Link>
            <div className="flex items-center space-x-2">
                <p className="text-md font-bold">
                    <Link href="/forgot-password">Forgot your password?</Link>
                </p>
            </div>
        </div>
    );
};

export default page;
