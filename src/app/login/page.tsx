"use client";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Error } from "@/types/ErrorTypes";
const Page = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();
    const handleLogin = async () => {
        if (!email || !password) {
            // Display an error message or toast indicating that all fields are required
            toast({
                title: "All fields are required",
                description: "Please fill in all the fields to register.",
            });
            return;
        }
        try {
            setLoading(true);
            const loginData = {
                email: email,
                password: password,
            };
            const response = await axios.post(`/api/login`, loginData);
            toast({
                title: "Login Successful",
                description: response?.data?.message || "Error logging in",
            });
            console.log(response);
            router.push("/");
            router.refresh();
        } catch (error: unknown) {
            const Error = error as Error;
            toast({
                title: "Something went wrong",
                description: Error?.response?.data?.error || "Error logging in",
            });
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
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
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" required className=" p-4 bg-black/10 dark:text-white text-black focus:outline-none  border-2 rounded-lg " />
            </div>
            <div className="space-y-2 flex flex-col w-full">
                <Label htmlFor="password">Password</Label>
                <div className="w-full flex gap-3 p-4 bg-black/10 text-black focus:outline-none  border-2 rounded-lg">
                    <input type={`${showPassword ? "text" : "password"}`} placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} required className="w-[90%] dark:text-white bg-transparent focus:outline-none" />
                    <button onClick={() => setShowPassword(!showPassword)} className="w-[10%] flex justify-center items-center">
                        {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                </div>
            </div>

            <button className=" bg-[#519259] flex justify-center items-center p-4 w-full rounded-full text-white font-bold" onClick={handleLogin}>
                {loading ? <ClipLoader color="#fff" /> : "Login"}
            </button>
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

export default Page;
