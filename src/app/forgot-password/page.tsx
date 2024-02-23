"use client";

import React, { useState } from "react";
import { ClockLoader } from "react-spinners";
import axios from "axios";
import Link from "next/link";

import { toast } from "@/components/ui/use-toast";
import { Error } from "@/types/ErrorTypes";

const Page = () => {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const userData = {
                email: email,
            };
            const response = await axios.post("/api/forgot-password", userData);
            console.log(response);
            toast({
                title: "Success",
                description: response.data.message || "Email to reset password sent",
            });
        } catch (error: unknown) {
            const Error = error as Error;
            toast({
                title: "Something went wrong",
                description: Error?.response?.data?.error || "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-sm space-y-4 flex flex-col justify-center items-center min-h-[90vh]">
            <div className="space-y-2 text-center w-full">
                <img
                    alt="College logo"
                    className="mx-auto mb-8"
                    height="120"
                    src="https://cdn.discordapp.com/attachments/1172417618288840765/1210609823167676427/WhatsApp_Image_2024-02-23_at_20.59.43-removebg-preview-transformed.png?ex=65eb2f41&is=65d8ba41&hm=a240320e8a3642388a55817edfa2b30d096df3a4f5e6ee8fc5a12599e29c9acb&"
                    style={{
                        aspectRatio: "180/180",
                        objectFit: "cover",
                    }}
                    width="120"
                />
                <h1 className="text-3xl font-bold">Forgot Password</h1>
            </div>
            <form autoComplete="false" className="flex flex-col  w-full gap-2" onSubmit={handleResetPassword}>
                <label htmlFor="Email">Email</label>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className=" bg-transparent border-2 dark:border-white/20 border-black/20 p-4 focus:outline-none  rounded-lg dark:text-white text-black" autoComplete="off" />
                {loading ? (
                    <button className=" font-semibold flex gap-3 p-3  bg-black text-white rounded-lg items-center justify-center" disabled={true}>
                        <ClockLoader size={30} color="#ffff" />
                        <span>Sending...</span>
                    </button>
                ) : (
                    <button className={` p-3 ${email != "" ? "bg-blue-600 cursor-pointer text-white" : "dark:bg-white/30 bg-black/30 dark:text-black text-white cursor-not-allowed"} rounded-lg mt-3 font-semibold duration-200 ${email != "" && "hover:bg-white"} hover:text-black`} disabled={email != "" ? false : true}>
                        Send Email
                    </button>
                )}
            </form>
            <div className="flex items-center space-x-2">
                <p className="text-md font-bold">
                    <Link href="/login"> Login?</Link>
                </p>
            </div>
        </div>
    );
};

export default Page;
