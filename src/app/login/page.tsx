import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const page = () => {
    return (
        <div className="mx-auto max-w-sm space-y-4">
            <div className="space-y-2 text-center">
                <img
                    alt="College logo"
                    className="mx-auto"
                    height="120"
                    src="/placeholder.svg"
                    style={{
                        aspectRatio: "120/120",
                        objectFit: "cover",
                    }}
                    width="120"
                />
                <h1 className="text-3xl font-bold">Login</h1>
            </div>
            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Username" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Password" required type="password" />
            </div>
            <Button className="w-full">Login</Button>
            <div className="flex items-center space-x-2">
                <p className="text-sm">
                    <Link className="underline" href="#">
                        Forgot your password?
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default page;
