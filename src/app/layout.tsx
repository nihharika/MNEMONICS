import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <Toaster />
                <body suppressHydrationWarning className={`${inter.className} p-4 dark:bg-black bg-white dark:text-white text-black`}>
                    <section>
                        <Navbar />
                        {children}
                    </section>
                </body>
            </ThemeProvider>
        </html>
    );
}
