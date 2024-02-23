import { Bug, CalendarCheck, HeartHandshake, Map, Siren } from "lucide-react";
import Link from "next/link";

import MapComponent from "@/components/client/GoogleMaps";

export default function Home() {
    const homeItems = [
        {
            name: "Help",
            link: "/help",
            icon: HeartHandshake,
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
        <main className=" mt-7 ">
            {/* <div className="bg-green-500 p-4 rounded-lg h-56 w-full"></div> */}
            <MapComponent />
            <div className="flex gap-8 justify-between items-center mt-7 border-b-2 border-black/ mb-2">
                {homeItems.map((item, index) => (
                    <Link href={item.link} key={index} className="flex-col justify-center items-center flex gap-3">
                        <item.icon />
                        <span className="text-md tracking-wide border-b-2 border-black/20">{item.name}</span>
                    </Link>
                ))}
            </div>
            <div>
                <Link
                    href={"/emergency-call"}
                    className=" bg-red-600 absolute right-3 bottom-28 text-lg 
             p-3 tracking-wide flex items-center gap-2 text-center  rounded-full text-white font-bold"
                >
                    <Siren />
                    <span>Emergency</span>
                </Link>
            </div>
        </main>
    );
}
