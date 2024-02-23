import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Secureuni",
    description: "SecureUni is a safety app for campus communities, offering features like emergency SOS, live chat with security, anonymous reporting, event notifications, mental health support, and community connection. It prioritizes inclusivity, plans to integrate AI insights, and aims to create a safer campus environment.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <Toaster />
                <body suppressHydrationWarning className={`${inter.className} p-4 dark:bg-black bg-white dark:text-white text-black`}>
                    <section className=" max-w-[800px] m-auto" suppressHydrationWarning>
                        <Navbar />
                        {children}
                    </section>
                </body>
            </ThemeProvider>
        </html>
    );
}
