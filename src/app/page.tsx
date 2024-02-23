import { Bug, CalendarCheck, List, Map } from "lucide-react";
import Link from "next/link";

export default function Home() {
    const homeItems = [
        {
            name: "Checklist",
            link: "/checklist",
            icon: List,
        },
        {
            name: "Map",
            link: "/emergency-call",
            icon: Map,
        },
        {
            name: "Report",
            link: "/report",
            icon: Bug,
        },
        {
            name: "Events",
            link: "/event",
            icon: CalendarCheck,
        },
    ];
    return (
        <main className=" mt-7">
            <div className="bg-green-500 p-4 rounded-lg h-56 w-full"></div>
            <div className="flex gap-8 justify-between items-center mt-7 border-b-2 border-black/ mb-2">
                {homeItems.map((item, index) => (
                    <Link href={item.link} key={index} className="flex-col justify-center items-center flex gap-3">
                        <item.icon />
                        <span className="text-md tracking-wide border-b-2 border-black/20">{item.name}</span>
                    </Link>
                ))}
            </div>
        </main>
    );
}
