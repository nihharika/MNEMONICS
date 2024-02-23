"use client";

import React, { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { toast } from "@/components/ui/use-toast";
import { Error } from "@/types/ErrorTypes";

const Page = () => {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    const handleVerifyResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const userData = {
                token: token,
                password: password,
            };
            const response = await axios.post("/api/verifyForgotPassword", userData);
            toast({
                title: "Success",
                description: response.data.message || "Reset Successfull",
            });
            router.push("/login");
        } catch (error: unknown) {
            console.log(error);
            const Error = error as Error;
            toast({
                title: "Something went wrong",
                description: Error?.response?.data?.error || "Something went wrong",
            });
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (confirmPassword && confirmPassword !== value) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        if (password && password !== value) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    };
    return (
        <>
            {token ? (
                <div className="mx-auto max-w-sm space-y-4 flex flex-col justify-center items-center min-h-[80vh]">
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
                        <h1 className="text-3xl font-bold">Enter Your New Password</h1>
                    </div>
                    <form autoComplete="false" className="flex w-full flex-col gap-2" onSubmit={handleVerifyResetPassword}>
                        <label htmlFor="Password">Password</label>
                        <div className={`flex justify-between items-center border-2 rounded-lg  ${passwordMismatch ? "border-red-500" : "border-black/20"} p-4 `}>
                            <input type={`${showPassword ? "text" : "password"}`} placeholder="Password should have alteast 8 characters" className="w-[90%] bg-transparent focus:outline-none " onChange={(e) => handlePasswordChange(e.target.value)} />
                            {showPassword ? <EyeOff onClick={() => setShowPassword(!showPassword)} /> : <Eye onClick={() => setShowPassword(!showPassword)} />}
                        </div>

                        <label htmlFor="password">Confirm Password</label>
                        <div className={`flex justify-between items-center border-2 rounded-lg  ${passwordMismatch ? "border-red-500" : "border-black/20"} p-4 `}>
                            <input type={`${showConfirmPassword ? "text" : "password"}`} placeholder="Please confirm your password" className=" w-[90%] bg-transparent focus:outline-none" onChange={(e) => handleConfirmPasswordChange(e.target.value)} />
                            {showConfirmPassword ? <EyeOff onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : <Eye onClick={() => setShowConfirmPassword(!showConfirmPassword)} />}
                        </div>
                        {passwordMismatch && <span className="text-red-500 font-semibold">Password Didn&apos;t Match</span>}
                        {password && confirmPassword.length < 8 && <span className="text-red-500 font-semibold">Password should have alteast 8 characters</span>}
                        {loading ? (
                            <button className=" font-semibold flex gap-3 p-3  bg-white text-black rounded-lg items-center justify-center" disabled={true}>
                                <ClockLoader size={30} />
                                <span>Resetting...</span>
                            </button>
                        ) : (
                            <button className={` p-3 ${password && confirmPassword != "" && password === confirmPassword ? "bg-blue-600 text-white cursor-pointer" : "bg-black/30 text-black cursor-not-allowed"} rounded-lg mt-3 font-semibold duration-200 ${password && confirmPassword != "" && password && confirmPassword.length > 8 && password && "hover:bg-white"} hover:text-black`} disabled={password && confirmPassword != "" && password && confirmPassword.length > 8 && password ? false : true}>
                                Reset
                            </button>
                        )}
                    </form>
                </div>
            ) : (
                <h1 className="flex justify-center items-center min-h-screen text-red-500 text-3xl font-semibold animate-bounce duration-200">No token found</h1>
            )}
        </>
    );
};

export default Page;
